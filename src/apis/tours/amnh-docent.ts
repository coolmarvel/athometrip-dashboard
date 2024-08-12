import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/amnh-docent?params
export const useGetAMNHDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.AMNHDocent), params);
};

// [GET] /api/tickets/amnh-docent/{id}
export const useGetAMNHDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.AMNHDocent, { id }));
};

// [PUT] /api/tickets/amnh-docent
export const useUpdateAMNHDocent = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.AMNHDocent, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/amnh-docent/reset
export const useResetAMNHDocent = () => {
  return usePost(`${toUrl(ApiRoutes.AMNHDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.AMNHDocent)) });
};

export const useRefetchAMNHDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.AMNHDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.AMNHDocent)) });
};