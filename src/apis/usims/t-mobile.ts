import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate } from '..';

// [GET] /api/usims/t-mobile/daily
export const useGetTMobileDailyByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobileDaily), params);
};

// [DELETE] /api/usims/t-mobile/daily/reset
export const useResetTMobileDaily = () => {
  return usePost(`${toUrl(ApiRoutes.TMobileDaily)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobileDaily)) });
};

// [GET] /api/usims/t-mobile/daily-other
export const useGetTMobileDailyByPageOtherByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobileDailyOther), params);
};

// [DELETE] /api/usims/t-mobile/daily-other/reset
export const useResetTMobileDailyOther = () => {
  return usePost(`${toUrl(ApiRoutes.TMobileDailyOther)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobileDailyOther)) });
};

// [GET] /api/usims/t-mobile/monthly
export const useGetTMobileMonthlyByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobileMonthly), params);
};

// [DELETE] /api/usims/t-mobile/monthly/reset
export const useResetTMobileMonthly = () => {
  return usePost(`${toUrl(ApiRoutes.TMobileMonthly)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobileMonthly)) });
};
