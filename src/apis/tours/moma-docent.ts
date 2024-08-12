import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/moma-docent?params
export const useGetMomaDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MomaDocent), params);
};

// [GET] /api/tickets/moma-docent/{id}
export const useGetMomaDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.MomaDocent, { id }));
};

// [PUT] /api/tickets/moma-docent
export const useUpdateMomaDocent = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.MomaDocent, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/moma-docent/reset
export const useResetMomaDocent = () => {
  return usePost(`${toUrl(ApiRoutes.MomaDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MomaDocent)) });
};

export const useRefetchMomaDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.MomaDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.MomaDocent)) });
};