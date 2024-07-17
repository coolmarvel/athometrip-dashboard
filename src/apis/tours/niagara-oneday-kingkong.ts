import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/niagara-oneday-kingkong?params
export const useGetNiagaraOneDayKingKongByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.NiagaraOneDayKingKong), params);
};

// [GET] /api/tickets/niagara-oneday-kingkong/{id}
export const useGetNiagaraOneDayKingKong = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.NiagaraOneDayKingKong, { id }));
};

// [PUT] /api/tickets/niagara-oneday-kingkong
export const useUpdateNiagaraOneDayKingKong = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.NiagaraOneDayKingKong, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/niagara-oneday-kingkong/reset
export const useResetNiagaraOneDayKingKong = () => {
  return usePost(`${toUrl(ApiRoutes.NiagaraOneDayKingKong)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.NiagaraOneDayKingKong)) });
};
