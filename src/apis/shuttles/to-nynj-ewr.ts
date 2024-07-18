import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/shuttles/to-nynj-ewr?params
export const useGetToNYNJEWRByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToNYNJEWR), params);
};

// [GET] /api/shuttles/to-nynj-ewr/{id}
export const useGetToNYNJEWR = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToNYNJEWR, { id }));
};

// [PUT] /api/shuttles/to-nynj-ewr
export const useUpdateToNYNJEWR = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.ToNYNJEWR, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/shuttles/to-nynj-ewr/reset
export const useResetToNYNJEWR = () => {
  return usePost(`${toUrl(ApiRoutes.ToNYNJEWR)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNJEWR)) });
};
