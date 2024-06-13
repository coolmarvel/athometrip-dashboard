import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate } from '..';

// [GET] /api/usims/h2osim/esim
export const useGetH2OEsimByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.H2OEsim), params);
};

// [DELETE] /api/usims/h2osim/esim/reset
export const useResetH2OEsim = () => {
  return usePost(`${toUrl(ApiRoutes.H2OEsim)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.H2OEsim)) });
};
