import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetGuggenheimDocentByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.GuggenheimDocent), params);
};

export const useGetGuggenheimDocent = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.GuggenheimDocent, { id }));
};
export const useResetGuggenheimDocent = () => {
  return usePost(`${toUrl(ApiRoutes.GuggenheimDocent)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.GuggenheimDocent)) });
};

export const useRefetchGuggenheimDocentByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.GuggenheimDocent)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.GuggenheimDocent)) });
};

export const useUpdateGuggenheimDocent = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.GuggenheimDocent, data)}/update`,
    [toUrl(ApiRoutes.GuggenheimDocent), params],
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