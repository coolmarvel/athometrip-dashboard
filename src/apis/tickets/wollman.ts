import { toUrl } from '@/utils';
import { PageQueryParams, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/wollman
export const useGetWollmanByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Wollman), params);
};

// [DELETE] /api/tickets/wollman/reset
export const useResetWollman = () => {
  return usePost(`${toUrl(ApiRoutes.Wollman)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Wollman)) });
};
