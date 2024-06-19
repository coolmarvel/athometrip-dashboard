import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate, useFetch } from '..';

// [GET] /api/usims/h2o-esim?params
export const useGetH2OEsimByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.H2OEsim), params);
};

// [GET] /api/tickets/h2o-esim/{id}
export const useGetH2OEsim = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.H2OEsim, { id }));
};

// [DELETE] /api/usims/h2o-esim/reset
export const useResetH2OEsim = () => {
  return usePost(`${toUrl(ApiRoutes.H2OEsim)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.H2OEsim)) });
};
