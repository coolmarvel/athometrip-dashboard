import { toUrl } from '@/utils';
import { useFetch, useGetPage } from './hooks';
import { PageQueryParams } from './types';
import { ApiRoutes } from '@/constants';

// [GET] /api/orders/{id}
export const useGetOrders = (id?: number) => {
  return useFetch<any[]>(toUrl(ApiRoutes.Order), { id });
};

// [GET] /api/orders?page=1&limit=10
export const useGetOrdersByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Order), params);
};
