import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/snaps/vintage?params
export const useGetVintageByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Vintage), params);
};

// [GET] /api/snaps/vintage/{id}
export const useGetVintage = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Vintage, { id }));
};

// [PUT] /api/snaps/vintage
export const useUpdateVintage = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Vintage, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/snaps/vintage/reset
export const useResetVintage = () => {
  return usePost(`${toUrl(ApiRoutes.Vintage)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Vintage)) });
};

export const useRefetchVintageByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Vintage)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Vintage)) });
};