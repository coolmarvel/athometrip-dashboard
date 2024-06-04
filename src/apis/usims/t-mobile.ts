import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate } from '..';

// [GET] /api/usims/t-mobile/daily
export const useGetTMobileDaily = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobileDaily), params);
};

// [DELETE] /api/usims/t-mobile/daily/reset
export const useResetTMobileDaily = () => {
  return usePost(`${toUrl(ApiRoutes.TMobileDaily)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobileDaily)) });
};

// [GET] /api/usims/t-mobile/daily-plan
export const useGetTMobileDailyPlan = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobileDailyPlan), params);
};

// [DELETE] /api/usims/t-mobile/daily-plan/reset
export const useResettTMobileDailyPlan = () => {
  return usePost(`${toUrl(ApiRoutes.TMobileDailyPlan)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobileDailyPlan)) });
};

// [GET] /api/usims/t-mobile/monthly-plan
export const useGetTMobileMonthlyPlan = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobileMonthlyPlan), params);
};

// [DELETE] /api/usims/t-mobile/monthly-plan/reset
export const useResettTMobileMonthlyPlan = () => {
  return usePost(`${toUrl(ApiRoutes.TMobileMonthlyPlan)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobileMonthlyPlan)) });
};
