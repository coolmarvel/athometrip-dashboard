import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/city-trip
export const useGetCityTripByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.CityTrip), params);
};

// [PUT] /api/tickets/city-trip
export const useUpdateCityTrip = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.CityTrip, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/city-trip/reset
export const useResetCityTrip = () => {
  return usePost(`${toUrl(ApiRoutes.CityTrip)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.CityTrip)) });
};

export const useRefetchCityTripByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.CityTrip)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.CityTrip)) });
};