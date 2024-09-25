import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate, useFetch, useCommand } from '..';
import { cloneDeep } from 'lodash-es';

export const useGetH2OEsimByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.H2OEsim), params);
};

export const useGetH2OEsim = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.H2OEsim, { id }));
};

export const useResetH2OEsim = () => {
  return usePost(`${toUrl(ApiRoutes.H2OEsim)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.H2OEsim)) });
};

export const useRefetchH2OEsimByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.H2OEsim)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.H2OEsim)) });
};

export const useUpdateH2OEsim = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.H2OEsim, data)}/update`,
    [toUrl(ApiRoutes.H2OEsim), params],
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