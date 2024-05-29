import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useGetPage, useInvalidate, usePost } from '..';

// [GET] /api/tickets/summit
export const useGetSummitByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Summit), params);
};

// [DELETE] /api/tickets/summit/reset
export const useResetSummit = () => {
  return usePost(`${toUrl(ApiRoutes.Summit)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Summit)) });
};
