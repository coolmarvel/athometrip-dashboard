import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetToNYNJEWRByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToNYNJEWR), params);
};

export const useGetToNYNJEWR = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToNYNJEWR, { id }));
};

export const useResetToNYNJEWR = () => {
  return usePost(`${toUrl(ApiRoutes.ToNYNJEWR)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNJEWR)) });
};

export const useRefetchToNYNJEWRByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.ToNYNJEWR)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNJEWR)) });
};

export const useUpdateToNYNJEWR = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.ToNYNJEWR, data)}/update`,
    [toUrl(ApiRoutes.ToNYNJEWR), params],
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