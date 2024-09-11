import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetWollmanByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Wollman), params);
};

export const useGetWollman = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Wollman, { id }));
};

export const useResetWollman = () => {
  return usePost(`${toUrl(ApiRoutes.Wollman)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Wollman)) });
};

export const useRefetchWollmanByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Wollman)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Wollman)) });
};

export const useUpdateWollman = (params?: object) => {
  return useCommand(
    ((data: any) => `${toUrl(ApiRoutes.Wollman, data)}/update`),
    [toUrl(ApiRoutes.Wollman), params],
    undefined,
    (old: any, data: any) => {

      return {
        ...old,
        data: cloneDeep(old.data).map((item: any) => {
          console.log(item);
          if (item.id === Number(data.id)) return { ...item, order: { ...item.order, double_checked: data.double_checked, memo: data.memo } };

          return item;
        }),
      };
    },
  );
};