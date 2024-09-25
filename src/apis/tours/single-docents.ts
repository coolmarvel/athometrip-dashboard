import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetSingleDocentsByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.SingleDocents), params);
};

export const useGetSingleDocents = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.SingleDocents, { id }));
};
export const useResetSingleDocents = () => {
  return usePost(`${toUrl(ApiRoutes.SingleDocents)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.SingleDocents)) });
};

export const useRefetchSingleDocentsByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.SingleDocents)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.SingleDocents)) });
};

export const useUpdateSingleDocents = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.SingleDocents, data)}/update`,
    [toUrl(ApiRoutes.SingleDocents), params],
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