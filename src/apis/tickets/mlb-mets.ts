import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/mlb-mets?params
export const useGetMLBMetsByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MLBMets), params);
};

// [GET] /api/tickets/mlb-mets/{id}
export const useGetMLBMets = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.MLBMets, { id }));
};

// [PUT] /api/tickets/mlb-mets
export const useUpdateMLBMets = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.MLBMets, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/mlb-mets/reset
export const useResetMLBMets = () => {
  return usePost(`${toUrl(ApiRoutes.MLBMets)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MLBMets)) });
};

export const useRefetchMLBMetsByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.MLBMets)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.MLBMets)) });
};