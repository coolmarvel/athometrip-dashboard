import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetNiagaraTwoDaysByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.NiagaraTwoDays), params);
};

export const useGetNiagaraTwoDays = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.NiagaraTwoDays, { id }));
};
export const useResetNiagaraTwoDays = () => {
  return usePost(`${toUrl(ApiRoutes.NiagaraTwoDays)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraTwoDays)) });
};

export const useRefetchNiagaraTwoDaysByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.NiagaraTwoDays)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraTwoDays)) });
};

export const useUpdateNiagaraTwoDays = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.NiagaraTwoDays, data)}/update`,
    [toUrl(ApiRoutes.NiagaraTwoDays), params],
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