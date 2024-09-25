import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetMetroDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MetroDocent), params);
};

export const useGetMetroDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.MetroDocent, { id }));
};
export const useResetMetroDocent = () => {
  return usePost(`${toUrl(ApiRoutes.MetroDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MetroDocent)) });
};

export const useRefetchMetroDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.MetroDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.MetroDocent)) });
};

export const useUpdateMetroDocent = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.MetroDocent, data)}/update`,
    [toUrl(ApiRoutes.MetroDocent), params],
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