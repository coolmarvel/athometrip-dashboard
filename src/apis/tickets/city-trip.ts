import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useGetPage, useInvalidate, usePost } from '..';

export const useGetCityTripByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.CityTrip), params);
};

export const useResetCityTrip = () => {
  return usePost(`${toUrl(ApiRoutes.CityTrip)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.CityTrip)) });
};

export const useRefetchCityTripByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.CityTrip)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.CityTrip)) });
};

export const useUpdateCityTrip = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.CityTrip, data)}/update`,
    [toUrl(ApiRoutes.CityTrip), params],
    undefined,
    (old: any, data: any) => {
      return {
        ...old,
        data: cloneDeep(old.data).map((item: any) => {
          if (item.id === Number(data.id)) return { ...item, order: { ...item.order, double_checked: data.double_checked, memo: data.memo } };

          return item;
        }),
      };
    }
  );
};
