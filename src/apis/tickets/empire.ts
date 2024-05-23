import { toUrl } from '@/utils';
import { PageQueryParams, useGetPage } from '..';
import { ApiRoutes } from '@/constants';

// [GET] /api/tickets/empire?page=1&limit=10
export const useGetEmpireByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Empire), params);
};
