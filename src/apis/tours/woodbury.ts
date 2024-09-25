import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetWoodburyByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Woodbury), params);
};

export const useGetWoodbury = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Woodbury, { id }));
};
export const useResetWoodbury = () => {
  return usePost(`${toUrl(ApiRoutes.Woodbury)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Woodbury)) });
};

export const useRefetchWoodburyByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Woodbury)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Woodbury)) });
};

export const useUpdateWoodbury = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Woodbury, data)}/update`,
    [toUrl(ApiRoutes.Woodbury), params],
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