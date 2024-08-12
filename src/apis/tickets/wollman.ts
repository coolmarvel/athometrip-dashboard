import { toUrl } from '@/utils';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/wollman?params
export const useGetWollmanByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Wollman), params);
};

// [GET] /api/tickets/wollman/{id}
export const useGetWollman = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Wollman, { id }));
};

// [DELETE] /api/tickets/wollman/reset
export const useResetWollman = () => {
  return usePost(`${toUrl(ApiRoutes.Wollman)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Wollman)) });
};

export const useRefetchWollmanByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Wollman)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Wollman)) });
};