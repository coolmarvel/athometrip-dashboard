import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/guggenheim-docent?params
export const useGetGuggenheimDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.GuggenheimDocent), params);
};

// [GET] /api/tickets/guggenheim-docent/{id}
export const useGetGuggenheimDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.GuggenheimDocent, { id }));
};

// [PUT] /api/tickets/guggenheim-docent
export const useUpdateGuggenheimDocent = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.GuggenheimDocent, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/guggenheim-docent/reset
export const useResetGuggenheimDocent = () => {
  return usePost(`${toUrl(ApiRoutes.GuggenheimDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.GuggenheimDocent)) });
};

export const useRefetchGuggenheimDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.GuggenheimDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.GuggenheimDocent)) });
};