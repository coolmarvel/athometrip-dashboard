import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetToJFKNightByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToJFKNight), params);
};

export const useGetToJFKNight = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToJFKNight, { id }));
};

export const useResetToJFKNight = () => {
  return usePost(`${toUrl(ApiRoutes.ToJFKNight)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToJFKNight)) });
};

export const useRefetchToJFKNightByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.ToJFKNight)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToJFKNight)) });
};

export const useUpdateToJFKNight = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.ToJFKNight, data)}/update`,
    [toUrl(ApiRoutes.ToJFKNight), params],
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