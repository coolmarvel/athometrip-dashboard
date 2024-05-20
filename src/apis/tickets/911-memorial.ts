import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage } from '..';

export const useGet911Memorial = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Memorial911), { id });
};

// [GET] /api/tickets/911-memorial?page=1&limit=10
export const useGet911MemorialByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Memorial911, params));
};
