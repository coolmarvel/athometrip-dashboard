import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/niagara-twodays?params
export const useGetNiagaraTwoDaysByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.NiagaraTwoDays), params);
};

// [GET] /api/tickets/niagara-twodays/{id}
export const useGetNiagaraTwoDays = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.NiagaraTwoDays, { id }));
};

// [PUT] /api/tickets/niagara-twodays
export const useUpdateNiagaraTwoDays = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.NiagaraTwoDays, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/niagara-twodays/reset
export const useResetNiagaraTwoDays = () => {
  return usePost(`${toUrl(ApiRoutes.NiagaraTwoDays)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraTwoDays)) });
};

export const useRefetchNiagaraTwoDaysByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.NiagaraTwoDays)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraTwoDays)) });
};