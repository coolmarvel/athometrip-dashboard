import { toUrl } from '@/utils';
import { PageQueryParams, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/top-of-the-rock
export const useGetTopOfTheRockByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TopOfTheRock), params);
};

// [DELETE] /api/tickets/top-of-the-rock/reset
export const useResetTopOfTheRock = () => {
  return usePost(`${toUrl(ApiRoutes.TopOfTheRock)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TopOfTheRock)) });
};
