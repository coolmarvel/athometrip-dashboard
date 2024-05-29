import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/911-memorial
export const useGet911MemorialByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Memorial911), params);
};

// [PUT] /api/tickets/911-memorial
export const useUpdate911Memorial = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Memorial911, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/911-memorial/reset
export const useReset911Memorial = () => {
  return usePost(`${toUrl(ApiRoutes.Memorial911)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Memorial911)) });
};
