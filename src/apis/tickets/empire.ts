import { toUrl } from '@/utils';
import { PageQueryParams, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/empire
export const useGetEmpireByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Empire), params);
};

// [DELETE] /api/tickets/empire/reset
export const useResetEmpire = () => {
  return usePost(`${toUrl(ApiRoutes.Empire)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Empire)) });
};
