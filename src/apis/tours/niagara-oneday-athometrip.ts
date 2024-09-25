import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetNiagaraOneDayAthometripByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.NiagaraOneDayAthometrip), params);
};

export const useGetNiagaraOneDayAthometrip = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.NiagaraOneDayAthometrip, { id }));
};
export const useResetNiagaraOneDayAthometrip = () => {
  return usePost(`${toUrl(ApiRoutes.NiagaraOneDayAthometrip)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraOneDayAthometrip)) });
};

export const useRefetchNiagaraOneDayAthometripByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.NiagaraOneDayAthometrip)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraOneDayAthometrip)) });
};

export const useUpdateNiagaraOneDayAthometrip = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.NiagaraOneDayAthometrip, data)}/update`,
    [toUrl(ApiRoutes.NiagaraOneDayAthometrip), params],
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