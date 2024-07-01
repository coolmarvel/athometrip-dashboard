import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { PageQueryParams, useFetch, useGetPage, useInvalidate, usePost, useUpdate } from '..';

// [GET] /api/tickets/niagara?params
export const useGetNiagaraByPage = (params: PageQueryParams) => {
  return useGetPage<any[]>(toUrl(ApiRoutes.Niagara), params);
};

// [GET] /api/tickets/niagara/{id}
export const useGetNiagara = (id?: number) => {
  return useFetch<any>(toUrl(ApiRoutes.Niagara, { id }));
};

// [PUT] /api/tickets/niagara
export const useUpdateNiagara = () => {
  return useUpdate<any, any>(toUrl(ApiRoutes.Niagara, {}), undefined, undefined, (old, data) => ({ ...old, ...data }));
};

// [DELETE] /api/tickets/niagara/reset
export const useResetNiagara = () => {
  return usePost(`${toUrl(ApiRoutes.Niagara)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.Niagara)) });
};
