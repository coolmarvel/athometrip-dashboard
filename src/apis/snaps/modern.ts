import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/snaps/modern?params
export const useGetModernByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Modern), params);
};

// [GET] /api/snaps/modern/{id}
export const useGetModern = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Modern, { id }));
};

// [PUT] /api/snaps/modern
export const useUpdateModern = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Modern, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/snaps/modern/reset
export const useResetModern = () => {
  return usePost(`${toUrl(ApiRoutes.Modern)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Modern)) });
};
