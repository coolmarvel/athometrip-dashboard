import { toUrl } from '@/utils';
import { PageQueryParams, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/un-tour
export const useGetUNTourByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.UNTour), params);
};

// [DELETE] /api/tickets/un-tour/reset
export const useResetUNTour = () => {
  return usePost(`${toUrl(ApiRoutes.UNTour)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.UNTour)) });
};
