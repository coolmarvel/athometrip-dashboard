import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost } from '..';

// [GET] /api/tickets/top-of-the-rock?params
export const useGetTopOfTheRockByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TopOfTheRock, params), params);
};

// [GET] /api/tickets/top-of-the-rock/{id}
export const useGetTopOfTheRock = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.TopOfTheRock, { id }));
};

// [DELETE] /api/tickets/top-of-the-rock/reset
export const useResetTopOfTheRock = () => {
  return usePost(`${toUrl(ApiRoutes.TopOfTheRock)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TopOfTheRock)) });
};

export const useRefetchTopOfTheRockByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.TopOfTheRock)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.TopOfTheRock)) });
};