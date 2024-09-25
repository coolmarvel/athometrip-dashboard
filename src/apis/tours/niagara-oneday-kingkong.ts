import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetNiagaraOneDayKingKongByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.NiagaraOneDayKingKong), params);
};

export const useGetNiagaraOneDayKingKong = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.NiagaraOneDayKingKong, { id }));
};
export const useResetNiagaraOneDayKingKong = () => {
  return usePost(`${toUrl(ApiRoutes.NiagaraOneDayKingKong)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraOneDayKingKong)) });
};

export const useRefetchNiagaraOneDayKingKongByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.NiagaraOneDayKingKong)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraOneDayKingKong)) });
};

export const useUpdateNiagaraOneDayKingKong = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.NiagaraOneDayKingKong, data)}/update`,
    [toUrl(ApiRoutes.NiagaraOneDayKingKong), params],
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