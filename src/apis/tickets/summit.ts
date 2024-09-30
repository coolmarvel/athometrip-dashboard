import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetSummitByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Summit), params);
};

export const useGetSummit = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Summit, { id }));
};

export const useResetSummit = () => {
  return usePost(`${toUrl(ApiRoutes.Summit)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Summit)) });
};

export const useRefetchSummitByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Summit)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Summit)) });
};

export const useUpdateSummit = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.Summit, data)}/update`,
    [toUrl(ApiRoutes.Summit), params],
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
