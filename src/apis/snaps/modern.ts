import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetModernByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Modern), params);
};

export const useGetModern = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Modern, { id }));
};

export const useResetModern = () => {
  return usePost(`${toUrl(ApiRoutes.Modern)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Modern)) });
};

export const useRefetchModernByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Modern)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Modern)) });
};

export const useUpdateModern = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Modern, data)}/update`,
    [toUrl(ApiRoutes.Modern), params],
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
