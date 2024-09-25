import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetMetroDocentPaintingByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.MetroDocentPainting), params);
};

export const useGetMetroDocentPainting = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.MetroDocentPainting, { id }));
};
export const useResetMetroDocentPainting = () => {
  return usePost(`${toUrl(ApiRoutes.MetroDocentPainting)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.MetroDocentPainting)) });
};

export const useRefetchMetroDocentPaintingByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.MetroDocentPainting)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.MetroDocentPainting)) });
};

export const useUpdateMetroDocentPainting = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.MetroDocentPainting, data)}/update`,
    [toUrl(ApiRoutes.MetroDocentPainting), params],
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