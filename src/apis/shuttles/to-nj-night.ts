import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/shuttles/to-nj-night?params
export const useGetToNJNightByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToNJNight), params);
};

// [GET] /api/shuttles/to-nj-night/{id}
export const useGetToNJNight = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToNJNight, { id }));
};

// [PUT] /api/shuttles/to-nj-night
export const useUpdateToNJNight = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.ToNJNight, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/shuttles/to-nj-night/reset
export const useResetToNJNight = () => {
  return usePost(`${toUrl(ApiRoutes.ToNJNight)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNJNight)) });
};
