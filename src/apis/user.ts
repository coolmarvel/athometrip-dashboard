import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';
import { cloneDeep } from 'lodash-es';
import { CursorQueryParams, PageQueryParams, PageQueryResponse, Scheme, useCommand, useDelete, useFetch, useGetPage, useInvalidate, useLoadMore, usePost, useUpdate, useUpdateInList } from '.';
import { UseYnEnum } from '@/enums/use-yn.enum';

/**
 * 유저 정보
 */
export interface User extends Scheme {
  userId: string;
  userName: string;
  emailAddress: string;
  password: string;
  companyCode: string;
  department: string;
  useYn: UseYnEnum;
}

export type UserCreate = Omit<User, 'approved' | keyof Scheme>;

export type UserUpdate = Omit<User, 'approved' | 'createdAt' | 'updatedAt'>;

export interface UserApprove {
  id: number;
}

// [GET] /api/users/{id}
export const useGetUser = (id?: number) => {
  return useFetch<User>(toUrl(ApiRoutes.User, { id }));
};

// [GET] /api/users?page=1&limit=10
export const useGetUsersByPage = (params: PageQueryParams) => {
  return useGetPage<User[]>(toUrl(ApiRoutes.User), params);
};

// [GET] /api/users?limit=10
export const useGetUsersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<User[]>(toUrl(ApiRoutes.User), params);
};

// [POST] /api/users
export const useCreateUser = (params?: object) => {
  return usePost<User[] | PageQueryResponse<User[]>, UserCreate>(toUrl(ApiRoutes.User), params);
};

const updateUser = (user: User, update: UserUpdate) => {
  return {
    ...user,
    name: update.userName,
    email: update.emailAddress,
    updatedAt: new Date().toISOString(),
  };
};

// [PUT] /api/users/{id}
export const useUpdateUser = (id: number) => {
  return useUpdate<User, UserUpdate>(toUrl(ApiRoutes.User, { id }), undefined, undefined, (old, data) => updateUser(old, data));
};

// [PUT] /api/users/{id}
export const useUpdateUserInList = (params?: object) => {
  return useUpdateInList<PageQueryResponse<User[]>, UserUpdate>(toUrl(ApiRoutes.User), params, undefined, (old, data) => ({
    ...old,
    data: cloneDeep(old.data).map((item) => (item.id === data.id ? updateUser(item, data) : item)),
  }));
};

// [DELETE] /api/users/{id}
export const useDeleteUser = (params?: object) => {
  return useDelete<PageQueryResponse<User[]>, number>(toUrl(ApiRoutes.User), params, undefined, (old, id) => ({
    ...old,
    data: old.data.filter((item) => item.id !== id),
  }));
};

// [POST] /api/users/{id}/approve
export const useApproveUser = (params?: object) => {
  return useCommand<PageQueryResponse<User[]>, UserApprove>(
    (data) => toUrl(ApiRoutes.ApproveUser, data),
    [toUrl(ApiRoutes.User), params],
    undefined,
    (old, data) => {
      return {
        ...old,
        data: cloneDeep(old.data).map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              approved: true,
              updatedAt: new Date().toISOString(),
            };
          }
          return item;
        }),
      };
    },
  );
};

// [POST] /api/users/test/{count}
export const useCreateTestUsers = (count: number) => {
  return usePost(`${toUrl(ApiRoutes.User)}/test/${count}`, undefined, {
    onSuccess: useInvalidate(toUrl(ApiRoutes.User)),
  });
};

// [POST] /api/users/test/reset
export const useResetTestUsers = () => {
  return usePost(`${toUrl(ApiRoutes.User)}/test/reset`, undefined, {
    onSuccess: useInvalidate(toUrl(ApiRoutes.User)),
  });
};
