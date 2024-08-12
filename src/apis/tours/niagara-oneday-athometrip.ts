import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/niagara-oneday-athometrip?params
export const useGetNiagaraOneDayAthometripByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.NiagaraOneDayAthometrip), params);
};

// [GET] /api/tickets/niagara-oneday-athometrip/{id}
export const useGetNiagaraOneDayAthometrip = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.NiagaraOneDayAthometrip, { id }));
};

// [PUT] /api/tickets/niagara-oneday-athometrip
export const useUpdateNiagaraOneDayAthometrip = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.NiagaraOneDayAthometrip, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/niagara-oneday-athometrip/reset
export const useResetNiagaraOneDayAthometrip = () => {
  return usePost(`${toUrl(ApiRoutes.NiagaraOneDayAthometrip)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraOneDayAthometrip)) });
};

export const useRefetchNiagaraOneDayAthometripByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.NiagaraOneDayAthometrip)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraOneDayAthometrip)) });
};