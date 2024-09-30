import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate, useFetch, useCommand } from '..';

export const useGetTMobileByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TMobile), params);
};

export const useGetTMobile = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.TMobile, { id }));
};

export const useResetTMobile = () => {
  return usePost(`${toUrl(ApiRoutes.TMobile)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobile)) });
};

export const useRefetchTMobileByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.TMobile)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.TMobile)) });
};

export const useUpdateTMobile = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.TMobile, data)}/update`,
    [toUrl(ApiRoutes.TMobile), params],
    undefined,
    (old: any, data: any) => {
      return {
        ...old,
        data: cloneDeep(old.data).map((item: any) => {
          if (item.id === Number(data.id)) return { ...item, order: { ...item.order, double_checked: data.double_checked, memo: data.memo } };

          return item;
        }),
      };
    },
  );
};