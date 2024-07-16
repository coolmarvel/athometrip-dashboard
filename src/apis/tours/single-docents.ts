import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/single-docents?params
export const useGetSingleDocentsByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.SingleDocents), params);
};

// [GET] /api/tickets/single-docents/{id}
export const useGetSingleDocents = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.SingleDocents, { id }));
};

// [PUT] /api/tickets/single-docents
export const useUpdateSingleDocents = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.SingleDocents, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/single-docents/reset
export const useResetSingleDocents = () => {
  return usePost(`${toUrl(ApiRoutes.SingleDocents)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.SingleDocents)) });
};
