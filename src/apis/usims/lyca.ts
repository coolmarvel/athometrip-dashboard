import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate } from '..';

// [GET] /api/usims/lyca/portal
export const useGetLycaPortalByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.LycaPortal), params);
};

// [DELETE] /api/usims/lyca/portal/reset
export const useResetLycaPortal = () => {
  return usePost(`${toUrl(ApiRoutes.LycaPortal)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.LycaPortal)) });
};

// [GET] /api/usims/lyca/monthly-plan
export const useGetLycaMonthlyPlanByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.LycaMonthlyPlan), params);
};

// [DELETE] /api/usims/lyca/monthly-plan/reset
export const useResettLycaMonthlyPlanByPage = () => {
  return usePost(`${toUrl(ApiRoutes.LycaMonthlyPlan)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.LycaMonthlyPlan)) });
};
