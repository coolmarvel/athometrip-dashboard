import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/shuttles/to-nynj?params
export const useGetToNYNJByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToNYNJ), params);
};

// [GET] /api/shuttles/to-nynj/{id}
export const useGetToNYNJ = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToNYNJ, { id }));
};

// [PUT] /api/shuttles/to-nynj
export const useUpdateToNYNJ = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.ToNYNJ, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/shuttles/to-nynj/reset
export const useResetToNYNJ = () => {
  return usePost(`${toUrl(ApiRoutes.ToNYNJ)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNJ)) });
};
