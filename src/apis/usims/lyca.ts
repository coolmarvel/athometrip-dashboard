import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate, useFetch } from '..';

// [GET] /api/usims/lyca?params
export const useGetLycaByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Lyca), params);
};

// [GET] /api/tickets/lyca/{id}
export const useGetLyca = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Lyca, { id }));
};

// [DELETE] /api/usims/lyca/reset
export const useResetLyca = () => {
  return usePost(`${toUrl(ApiRoutes.Lyca)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Lyca)) });
};

export const useRefetchLycaByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Lyca)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Lyca)) });
};