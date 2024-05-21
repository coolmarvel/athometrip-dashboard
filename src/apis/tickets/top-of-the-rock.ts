import { toUrl } from '@/utils';
import { PageQueryParams, useGetPage } from '..';
import { ApiRoutes } from '@/constants';

export const useGetTopOfTheRockByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.TopOfTheRock), params);
};
