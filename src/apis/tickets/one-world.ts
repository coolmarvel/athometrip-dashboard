import { toUrl } from '@/utils';
import { PageQueryParams, useGetPage, useInvalidate, usePost } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/one-world
export const useGetOneWorldByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.OneWorld), params);
};

// [DELETE] /api/tickets/one-world/reset
export const useResetOneWorld = () => {
  return usePost(`${toUrl(ApiRoutes.OneWorld)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.OneWorld)) });
};
