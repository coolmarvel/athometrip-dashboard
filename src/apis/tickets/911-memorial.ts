import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGet911MemorialByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Memorial911), params);
};

export const useGet911Memorial = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Memorial911, { id }));
};

export const useReset911Memorial = () => {
  return usePost(`${toUrl(ApiRoutes.Memorial911)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Memorial911)) });
};

export const useRefetch911MemorialByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.Memorial911)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.Memorial911)) });
};

export const useUpdate911Memorial = (params?: object) => {
  return useCommand(
    ((data: any) => `${toUrl(ApiRoutes.Memorial911, data)}/update`),
    [toUrl(ApiRoutes.Memorial911), params],
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