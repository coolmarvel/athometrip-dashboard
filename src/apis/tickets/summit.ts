import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost } from '..';

// [GET] /api/tickets/summit
export const useGetSummitByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Summit), params);
};

// [GET] /api/tickets/summit/{id}
export const useGetSummit = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Summit, { id }));
};

// [DELETE] /api/tickets/summit/reset
export const useResetSummit = () => {
  return usePost(`${toUrl(ApiRoutes.Summit)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Summit)) });
};
