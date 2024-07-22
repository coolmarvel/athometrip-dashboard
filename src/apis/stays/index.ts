import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/stays?params
export const useGetStaysByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Stays), params);
};

// [GET] /api/stays/{id}
export const useGetStays = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Stays, { id }));
};

// [PUT] /api/stays
export const useUpdateStays = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Stays, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/stays/reset
export const useResetStays = () => {
  return usePost(`${toUrl(ApiRoutes.Stays)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Stays)) });
};
