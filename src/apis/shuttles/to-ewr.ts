import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/shuttles/to-ewr?params
export const useGetToEWRByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToEWR), params);
};

// [GET] /api/shuttles/to-ewr/{id}
export const useGetToEWR = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToEWR, { id }));
};

// [PUT] /api/shuttles/to-ewr
export const useUpdateToEWR = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.ToEWR, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/shuttles/to-ewr/reset
export const useResetToEWR = () => {
  return usePost(`${toUrl(ApiRoutes.ToEWR)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToEWR)) });
};

export const useRefetchToEWRByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.ToEWR)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToEWR)) });
};