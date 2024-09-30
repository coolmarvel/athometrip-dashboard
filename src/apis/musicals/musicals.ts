import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetMusicalsByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Musicals), params);
};

export const useGetMusicals = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Musicals, { id }));
};

export const useResetMusicals = () => {
  return usePost(`${toUrl(ApiRoutes.Musicals)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Musicals)) });
};

export const useRefetchMusicalsByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Musicals)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.TopOfTheRock)) });
};

export const useUpdateMusicals = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Musicals, data)}/update`,
    [toUrl(ApiRoutes.Musicals), params],
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