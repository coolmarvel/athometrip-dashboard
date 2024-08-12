import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/musical?params
export const useGetMusicalsByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Musicals), params);
};

// [GET] /api/musical/{id}
export const useGetMusicals = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Musicals, { id }));
};

// [PUT] /api/musical
export const useUpdateMusicals = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Musicals, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/musical/reset
export const useResetMusicals = () => {
  return usePost(`${toUrl(ApiRoutes.Musicals)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Musicals)) });
};

export const useRefetchMusicalsByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Musicals)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.TopOfTheRock)) });
};