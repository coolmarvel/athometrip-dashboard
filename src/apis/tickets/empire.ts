import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetEmpireByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Empire), params);
};

export const useGetEmpire = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Empire, { id }));
};

export const useResetEmpire = () => {
  return usePost(`${toUrl(ApiRoutes.Empire)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Empire)) });
};

export const useRefetchEmpireByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Empire)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Empire)) });
};

export const useUpdateEmpire = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Empire, data)}/update`,
    [toUrl(ApiRoutes.Empire), params],
    undefined,
    (old: any, data: any) => {
      return {
        ...old,
        data: cloneDeep(old.data).map((item: any) => {
          if (item.id === Number(data.id)) return { ...item, order: { ...item.order, double_checked: data.double_checked, memo: data.memo } };

          return item;
        }),
      };
    }
  );
};
