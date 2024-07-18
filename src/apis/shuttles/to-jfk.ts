import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/shuttles/to-jfk?params
export const useGetToJFKByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToJFK), params);
};

// [GET] /api/shuttles/to-jfk/{id}
export const useGetToJFK = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToJFK, { id }));
};

// [PUT] /api/shuttles/to-jfk
export const useUpdateToJFK = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.ToJFK, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/shuttles/to-jfk/reset
export const useResetToJFK = () => {
  return usePost(`${toUrl(ApiRoutes.ToJFK)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToJFK)) });
};
