import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetOneWorldByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.OneWorld), params);
};

export const useGetOneWorld = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.OneWorld, { id }));
};

export const useResetOneWorld = () => {
  return usePost(`${toUrl(ApiRoutes.OneWorld)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.OneWorld)) });
};

export const useRefetchOneWorldByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.OneWorld)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.OneWorld)) });
};

export const useUpdateOneWorld = (params?: object) => {
  return useCommand(
    ((data: any) => `${toUrl(ApiRoutes.OneWorld, data)}/update`),
    [toUrl(ApiRoutes.OneWorld), params],
    undefined,
    (old: any, data: any) => {

      return {
        ...old,
        data: cloneDeep(old.data).map((item: any) => {
          console.log(item);
          if (item.id === Number(data.id)) return { ...item, order: { ...item.order, double_checked: data.double_checked, memo: data.memo } };

          return item;
        }),
      };
    },
  );
};