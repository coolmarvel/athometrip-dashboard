import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetToNYNightByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.ToNYNight), params);
};

export const useGetToNYNight = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.ToNYNight, { id }));
};

export const useResetToNYNight = () => {
  return usePost(`${toUrl(ApiRoutes.ToNYNight)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNight)) });
};

export const useRefetchToNYNightByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.ToNYNight)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.ToNYNight)) });
};

export const useUpdateToNYNight = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.ToNYNight, data)}/update`,
    [toUrl(ApiRoutes.ToNYNight), params],
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