import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetBostonByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Boston), params);
};

export const useGetBoston = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Boston, { id }));
};
export const useResetBoston = () => {
  return usePost(`${toUrl(ApiRoutes.Boston)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Boston)) });
};

export const useRefetchBostonByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Boston)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Boston)) });
};

export const useUpdateBoston = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Boston, data)}/update`,
    [toUrl(ApiRoutes.Boston), params],
    undefined,
    (old: any, data: any) => {
      return {
        ...old,
        data: cloneDeep(old.data).map((item: any) => {
          if (item.id === Number(data.id)) return { ...item, order: { ...item.order, double_checked: data.double_checked, memo: data.memo } };

          return item;
        }),
      };
    },
  );
};
