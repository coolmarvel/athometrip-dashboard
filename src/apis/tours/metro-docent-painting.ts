import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/metro-docent-painting?params
export const useGetMetroDocentPaintingByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MetroDocentPainting), params);
};

// [GET] /api/tickets/metro-docent-painting/{id}
export const useGetMetroDocentPainting = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.MetroDocentPainting, { id }));
};

// [PUT] /api/tickets/metro-docent-painting
export const useUpdateMetroDocentPainting = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.MetroDocentPainting, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/metro-docent-painting/reset
export const useResetMetroDocentPainting = () => {
  return usePost(`${toUrl(ApiRoutes.MetroDocentPainting)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MetroDocentPainting)) });
};
