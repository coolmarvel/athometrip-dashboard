import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetToNYNJByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToNYNJ), params);
};

export const useGetToNYNJ = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToNYNJ, { id }));
};

export const useResetToNYNJ = () => {
  return usePost(`${toUrl(ApiRoutes.ToNYNJ)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNJ)) });
};

export const useRefetchToNYNJByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.ToNYNJ)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNJ)) });
};

export const useUpdateToNYNJ = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.ToNYNJ, data)}/update`,
    [toUrl(ApiRoutes.ToNYNJ), params],
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