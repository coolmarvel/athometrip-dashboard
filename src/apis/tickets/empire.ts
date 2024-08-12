import { toUrl } from '@/utils';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/empire?params
export const useGetEmpireByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Empire), params);
};

// [GET] /api/tickets/empire/{id}
export const useGetEmpire = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Empire, { id }));
};

// [DELETE] /api/tickets/empire/reset
export const useResetEmpire = () => {
  return usePost(`${toUrl(ApiRoutes.Empire)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Empire)) });
};

export const useRefetchEmpireByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Empire)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Empire)) });
};