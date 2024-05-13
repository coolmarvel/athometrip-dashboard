import { toUrl } from '@/utils';
import { useFetch, useGetPage } from './hooks';
import { PageQueryParams } from './types';
import { ApiRoutes } from '@/constants';

// [GET] /api/tests/{id}
export const useGetTest = (id?: number) => {
  return useFetch<any[]>(toUrl(ApiRoutes.Test), { id });
};

// [GET] /api/tests?page=1&limit=10
export const useGetTestByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Test), params);
};
