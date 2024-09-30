import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetVintageByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Vintage), params);
};

export const useGetVintage = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Vintage, { id }));
};

export const useResetVintage = () => {
  return usePost(`${toUrl(ApiRoutes.Vintage)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Vintage)) });
};

export const useRefetchVintageByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Vintage)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Vintage)) });
};

export const useUpdateVintage = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Vintage, data)}/update`,
    [toUrl(ApiRoutes.Vintage), params],
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
