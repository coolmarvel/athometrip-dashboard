import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/landmark?params
export const useGetLandmarkByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Landmark), params);
};

// [GET] /api/tickets/landmark/{id}
export const useGetLandmark = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Landmark, { id }));
};

// [PUT] /api/tickets/landmark
export const useUpdateLandmark = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Landmark, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/landmark/reset
export const useResetLandmark = () => {
  return usePost(`${toUrl(ApiRoutes.Landmark)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Landmark)) });
};
