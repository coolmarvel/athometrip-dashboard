import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetStaysByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Stays), params);
};

export const useGetStays = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Stays, { id }));
};

export const useResetStays = () => {
  return usePost(`${toUrl(ApiRoutes.Stays)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Stays)) });
};

export const useRefetchStaysByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Stays)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Stays)) });
};

export const useUpdateStays = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Stays, data)}/update`,
    [toUrl(ApiRoutes.Stays), params],
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