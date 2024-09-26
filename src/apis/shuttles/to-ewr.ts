import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetToEWRByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToEWR), params);
};

export const useGetToEWR = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToEWR, { id }));
};

export const useResetToEWR = () => {
  return usePost(`${toUrl(ApiRoutes.ToEWR)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToEWR)) });
};

export const useRefetchToEWRByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.ToEWR)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToEWR)) });
};

export const useUpdateToEWR = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.ToEWR, data)}/update`,
    [toUrl(ApiRoutes.ToEWR), params],
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