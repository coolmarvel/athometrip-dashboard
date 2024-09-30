import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetWashingtonDCByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.WashingtonDC), params);
};

export const useGetWashingtonDC = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.WashingtonDC, { id }));
};
export const useResetWashingtonDC = () => {
  return usePost(`${toUrl(ApiRoutes.WashingtonDC)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.WashingtonDC)) });
};

export const useRefetchWashingtonDCByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.WashingtonDC)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.WashingtonDC)) });
};

export const useUpdateWashingtonDC = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.WashingtonDC, data)}/update`,
    [toUrl(ApiRoutes.WashingtonDC), params],
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