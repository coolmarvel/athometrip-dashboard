import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetAMNHDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.AMNHDocent), params);
};

export const useGetAMNHDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.AMNHDocent, { id }));
};

export const useResetAMNHDocent = () => {
  return usePost(`${toUrl(ApiRoutes.AMNHDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.AMNHDocent)) });
};

export const useRefetchAMNHDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.AMNHDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.AMNHDocent)) });
};

export const useUpdateAMNHDocent = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.AMNHDocent, data)}/update`,
    [toUrl(ApiRoutes.AMNHDocent), params],
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