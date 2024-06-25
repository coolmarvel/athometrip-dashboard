import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/woodbury?params
export const useGetWoodburyByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Woodbury), params);
};

// [GET] /api/tickets/woodbury/{id}
export const useGetWoodbury = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Woodbury, { id }));
};

// [PUT] /api/tickets/woodbury
export const useUpdateWoodbury = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Woodbury, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/woodbury/reset
export const useResetWoodbury = () => {
  return usePost(`${toUrl(ApiRoutes.Woodbury)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Woodbury)) });
};
