import { toUrl } from '@/utils';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/top-of-the-rock?params
export const useGetTopOfTheRockByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TopOfTheRock), params);
};

// [GET] /api/tickets/top-of-the-rock/{id}
export const useGetTopOfTheRock = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.TopOfTheRock, { id }));
};

// [DELETE] /api/tickets/top-of-the-rock/reset
export const useResetTopOfTheRock = () => {
  return usePost(`${toUrl(ApiRoutes.TopOfTheRock)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TopOfTheRock)) });
};
