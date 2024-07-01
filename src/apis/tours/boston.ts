import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/boston?params
export const useGetBostonByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Boston), params);
};

// [GET] /api/tickets/boston/{id}
export const useGetBoston = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Boston, { id }));
};

// [PUT] /api/tickets/boston
export const useUpdateBoston = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Boston, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/boston/reset
export const useResetBoston = () => {
  return usePost(`${toUrl(ApiRoutes.Boston)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Boston)) });
};
