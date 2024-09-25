import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetWhitneyDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.WhitneyDocent), params);
};

export const useGetWhitneyDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.WhitneyDocent, { id }));
};

export const useResetWhitneyDocent = () => {
  return usePost(`${toUrl(ApiRoutes.WhitneyDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.WhitneyDocent)) });
};

export const useRefetchWhitneyDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.WhitneyDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.WhitneyDocent)) });
};

export const useUpdateWhitneyDocent = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.WhitneyDocent, data)}/update`,
    [toUrl(ApiRoutes.WhitneyDocent), params],
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