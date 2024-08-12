import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/shuttles/to-jfk-night?params
export const useGetToJFKNightByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToJFKNight), params);
};

// [GET] /api/shuttles/to-jfk-night/{id}
export const useGetToJFKNight = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToJFKNight, { id }));
};

// [PUT] /api/shuttles/to-jfk-night
export const useUpdateToJFKNight = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.ToJFKNight, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/shuttles/to-jfk-night/reset
export const useResetToJFKNight = () => {
  return usePost(`${toUrl(ApiRoutes.ToJFKNight)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToJFKNight)) });
};

export const useRefetchToJFKNightByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.ToJFKNight)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToJFKNight)) });
};