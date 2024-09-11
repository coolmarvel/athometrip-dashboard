import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetMLBMetsByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MLBMets), params);
};

export const useGetMLBMets = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.MLBMets, { id }));
};

export const useResetMLBMets = () => {
  return usePost(`${toUrl(ApiRoutes.MLBMets)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MLBMets)) });
};

export const useRefetchMLBMetsByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.MLBMets)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.MLBMets)) });
};

export const useUpdateMLBMets = (params?: object) => {
  return useCommand(
    ((data: any) => `${toUrl(ApiRoutes.MLBMets, data)}/update`),
    [toUrl(ApiRoutes.MLBMets), params],
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