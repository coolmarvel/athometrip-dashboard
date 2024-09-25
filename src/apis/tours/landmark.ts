import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetLandmarkByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Landmark), params);
};

export const useGetLandmark = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Landmark, { id }));
};
export const useResetLandmark = () => {
  return usePost(`${toUrl(ApiRoutes.Landmark)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Landmark)) });
};

export const useRefetchLandmarkByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Landmark)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Landmark)) });
};

export const useUpdateLandmark = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Landmark, data)}/update`,
    [toUrl(ApiRoutes.Landmark), params],
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