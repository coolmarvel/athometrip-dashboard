import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetToJFKByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToJFK), params);
};

export const useGetToJFK = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToJFK, { id }));
};

export const useResetToJFK = () => {
  return usePost(`${toUrl(ApiRoutes.ToJFK)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToJFK)) });
};

export const useRefetchToJFKByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.ToJFK)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToJFK)) });
};

export const useUpdateToJFK = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.ToJFK, data)}/update`,
    [toUrl(ApiRoutes.ToJFK), params],
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