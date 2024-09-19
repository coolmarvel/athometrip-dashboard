import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetEllisIslandByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.EllisIsland), params);
};

export const useGetEllisIsland = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.EllisIsland, { id }));
};

export const useResetEllisIsland = () => {
  return usePost(`${toUrl(ApiRoutes.EllisIsland)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.EllisIsland)) });
};

export const useRefetchEllisIslandByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.EllisIsland)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.EllisIsland)) });
};

export const useUpdateEllisIsland = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.EllisIsland, data)}/update`,
    [toUrl(ApiRoutes.EllisIsland), params],
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
