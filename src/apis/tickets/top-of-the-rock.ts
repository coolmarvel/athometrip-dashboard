import { toUrl } from '@/utils';
import { PageQueryParams, useGetPage } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/top-of-the-rock?page=1&limit=10
export const useGetTopOfTheRockByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TopOfTheRock), params);
};
