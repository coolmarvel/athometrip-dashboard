import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetUNTourByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.UNTour), params);
};

export const useGetUNTour = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.UNTour, { id }));
};

export const useResetUNTour = () => {
  return usePost(`${toUrl(ApiRoutes.UNTour)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.UNTour)) });
};

export const useRefetchUNTourByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.UNTour)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.UNTour)) });
};

export const useUpdateUNTour = (params?: object) => {
  return useCommand(
    ((data: any) => `${toUrl(ApiRoutes.UNTour, data)}/update`),
    [toUrl(ApiRoutes.UNTour), params],
    undefined,
    (old: any, data: any) => {

      return {
        ...old,
        data: cloneDeep(old.data).map((item: any) => {
          console.log(item);
          if (item.id === Number(data.id)) return { ...item, order: { ...item.order, double_checked: data.double_checked, memo: data.memo } };

          return item;
        }),
      };
    },
  );
};