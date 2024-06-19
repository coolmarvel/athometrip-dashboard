import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate, useFetch } from '..';

// [GET] /api/tickets/t-mobile?params
export const useGetTMobileByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobile), params);
};

// [GET] /api/tickets/t-mobile/{id}
export const useGetTMobile = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.TMobile, { id }));
};

// [DELETE] /api/usims/t-mobile/reset
export const useResetTMobile = () => {
  return usePost(`${toUrl(ApiRoutes.TMobile)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobile)) });
};
