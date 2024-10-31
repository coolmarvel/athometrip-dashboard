import { cloneDeep } from 'lodash-es';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useCommand, useFetch, useGetPage, useInvalidate, usePost } from '..';

export const useGetTopOfTheRockByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TopOfTheRock), params);
};

export const useGetTopOfTheRock = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.TopOfTheRock, { id }));
};

export const useResetTopOfTheRock = () => {
  return usePost(`${toUrl(ApiRoutes.TopOfTheRock)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.TopOfTheRock)) });
};

export const useRefetchTopOfTheRockByPage = (params?: object) => {
  return usePost<any>(`${toUrl(ApiRoutes.TopOfTheRock)}/refetch`, params, { onSuccess: useInvalidate(toUrl(ApiRoutes.TopOfTheRock)) });
};

export const useUpdateTopOfTheRock = (params?: object) => {
  return useCommand(
    (data: any) => `${toUrl(ApiRoutes.TopOfTheRock, data)}/update`,
    [toUrl(ApiRoutes.TopOfTheRock), params],
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
