import { toUrl } from '@/utils';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/one-world?params
export const useGetOneWorldByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.OneWorld), params);
};

// [GET] /api/tickets/one-world/{id}
export const useGetOneWorld = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.OneWorld, { id }));
};

// [DELETE] /api/tickets/one-world/reset
export const useResetOneWorld = () => {
  return usePost(`${toUrl(ApiRoutes.OneWorld)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.OneWorld)) });
};
