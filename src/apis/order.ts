import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { CursorQueryParams, PageQueryParams, Scheme, User, useDelete, useFetch, useGetPage, useInvalidate, useLoadMore, usePost, useUpdate } from '.';
import { Nullable } from '@/types';

export interface Order extends Scheme {
  userId: number;
  user: Nullable<User>;
  title: string;
  content: string;
}

export type OrderCreate = Omit<Order, 'order' | keyof Scheme>;

export type OrderUpdate = Omit<Order, 'order' | 'createdAt' | 'updatedAt'>;

// [GET] /api/orders/{id}
export const useGetOrders = (id?: number) => {
  return useFetch<any[]>(toUrl(ApiRoutes.Order), { id });
};

// [GET] /api/orders?page=1&limit=10
export const useGetOrdersByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Order), params);
};

// [GET] /api/orders?limit=10
export const useGetOrdersByCursor = (params: CursorQueryParams) => {
  return useLoadMore<Order[]>(toUrl(ApiRoutes.Order), params);
};

// [POST] /api/orders
export const useCreateOrder = (params?: object) => {
  return usePost<Order[], OrderCreate, number>(toUrl(ApiRoutes.Order), params);
};

// [PUT] /api/orders/{id}
export const useUpdateOrder = (id: number) => {
  return useUpdate<Order, OrderUpdate>(toUrl(ApiRoutes.Order, { id }), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/orders/{id}
export const useDeleteOrder = () => {
  return useDelete<Order[], number>(toUrl(ApiRoutes.Order), undefined, undefined, (old, id) => old.filter((item) => item.id !== id));
};

// [POST] /api/orders/test/{count}
export const useCreateTestOrders = (count: number) => {
  return usePost(`${toUrl(ApiRoutes.Order)}/test/${count}`, undefined, {
    onSuccess: useInvalidate(toUrl(ApiRoutes.Order)),
  });
};

// [DELETE] /api/orders/test/reset
export const useResetTestOrders = () => {
  return usePost(`${toUrl(ApiRoutes.Order)}/test/reset`, undefined, {
    onSuccess: useInvalidate(toUrl(ApiRoutes.Order)),
  });
};
