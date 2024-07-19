import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/shuttles/to-ny-night?params
export const useGetToNYNightByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToNYNight), params);
};

// [GET] /api/shuttles/to-ny-night/{id}
export const useGetToNYNight = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToNYNight, { id }));
};

// [PUT] /api/shuttles/to-ny-night
export const useUpdateToNYNight = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.ToNYNight, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/shuttles/to-ny-night/reset
export const useResetToNYNight = () => {
  return usePost(`${toUrl(ApiRoutes.ToNYNight)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNight)) });
};
