import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/ellis-island
export const useGetEllisIslandByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.EllisIsland), params);
};

// [PUT] /api/tickets/ellis-island
export const useUpdateEllisIsland = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.EllisIsland, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/ellis-island/reset
export const useResetEllisIsland = () => {
  return usePost(`${toUrl(ApiRoutes.EllisIsland)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.EllisIsland)) });
};
