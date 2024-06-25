import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/whitney-docent?params
export const useGetWhitneyDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.WhitneyDocent), params);
};

// [GET] /api/tickets/whitney-docent/{id}
export const useGetWhitneyDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.WhitneyDocent, { id }));
};

// [PUT] /api/tickets/whitney-docent
export const useUpdateWhitneyDocent = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.WhitneyDocent, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/whitney-docent/reset
export const useResetWhitneyDocent = () => {
  return usePost(`${toUrl(ApiRoutes.WhitneyDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.WhitneyDocent)) });
};
