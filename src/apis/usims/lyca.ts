import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useGetPage, PageQueryParams, usePost, useInvalidate, useFetch, useCommand } from '..';
import { cloneDeep } from 'lodash-es';

export const useGetLycaByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Lyca), params);
};

export const useGetLyca = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Lyca, { id }));
};

export const useResetLyca = () => {
  return usePost(`${toUrl(ApiRoutes.Lyca)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Lyca)) });
};

export const useRefetchLycaByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Lyca)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Lyca)) });
};

export const useUpdateLyca = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Lyca, data)}/update`,
    [toUrl(ApiRoutes.Lyca), params],
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