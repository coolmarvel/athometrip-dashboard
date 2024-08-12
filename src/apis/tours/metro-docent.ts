import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/metro-docent?params
export const useGetMetroDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MetroDocent), params);
};

// [GET] /api/tickets/metro-docent/{id}
export const useGetMetroDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.MetroDocent, { id }));
};

// [PUT] /api/tickets/metro-docent
export const useUpdateMetroDocent = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.MetroDocent, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/metro-docent/reset
export const useResetMetroDocent = () => {
  return usePost(`${toUrl(ApiRoutes.MetroDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MetroDocent)) });
};

export const useRefetchMetroDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.MetroDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.MetroDocent)) });
};