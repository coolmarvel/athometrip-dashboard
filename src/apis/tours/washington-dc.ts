import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/washington-dc?params
export const useGetWashingtonDCByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.WashingtonDC), params);
};

// [GET] /api/tickets/washington-dc/{id}
export const useGetWashingtonDC = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.WashingtonDC, { id }));
};

// [PUT] /api/tickets/washington-dc
export const useUpdateWashingtonDC = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.WashingtonDC, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/washington-dc/reset
export const useResetWashingtonDC = () => {
  return usePost(`${toUrl(ApiRoutes.WashingtonDC)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.WashingtonDC)) });
};
