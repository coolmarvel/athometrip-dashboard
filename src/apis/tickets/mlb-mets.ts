import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/mlb-mets
export const useGetMLBMetsByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MLBMets), params);
};

// [PUT] /api/tickets/mlb-mets
export const useUpdateMLBMets = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.MLBMets, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/mlb-mets/reset
export const useResetMLBMets = () => {
  return usePost(`${toUrl(ApiRoutes.MLBMets)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MLBMets)) });
};
