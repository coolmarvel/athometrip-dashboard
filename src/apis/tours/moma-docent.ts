import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetMomaDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MomaDocent), params);
};

export const useGetMomaDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.MomaDocent, { id }));
};
export const useResetMomaDocent = () => {
  return usePost(`${toUrl(ApiRoutes.MomaDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MomaDocent)) });
};

export const useRefetchMomaDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.MomaDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.MomaDocent)) });
};

export const useUpdateMomaDocent = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.MomaDocent, data)}/update`,
    [toUrl(ApiRoutes.MomaDocent), params],
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