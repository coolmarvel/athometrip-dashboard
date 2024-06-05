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

// [GET] /api/usims/t-mobile/daily-other
export const useGetTMobileDailyOther = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobileDailyOther), params);
};

// [DELETE] /api/usims/t-mobile/daily-other/reset
export const useResettTMobileDailyOther = () => {
  return usePost(`${toUrl(ApiRoutes.TMobileDailyOther)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobileDailyOther)) });
};

// [GET] /api/usims/t-mobile/monthly
export const useGetTMobileMonthly = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobileMonthly), params);
};

// [DELETE] /api/usims/t-mobile/monthly/reset
export const useResettTMobileMonthly = () => {
  return usePost(`${toUrl(ApiRoutes.TMobileMonthly)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobileMonthly)) });
};
