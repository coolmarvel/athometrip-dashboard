import { Nullable, Optional } from '@/types';
import {
  MutationFunction,
  QueryFunctionContext,
  UseMutationOptions,
  useInfiniteQuery as _useInfiniteQuery,
  useMutation as _useMutation,
  useQuery as _useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ApiError, ApiResponse, CursorQueryResponse, ID, InfiniteQueryOptions, MutationOptions, PageQueryOptions, PageQueryResponse, QueryKey, QueryOptions, UrlBuilder } from './types';
import { Api, buildQueryKey, buildUrl } from './utils';

const fetcher = async <TResponse>(context: QueryFunctionContext<QueryKey>) => {
  const { queryKey, pageParam } = context;
  const [url, params] = queryKey;
  return Api.get<ApiResponse<TResponse>>(buildUrl(url, undefined), pageParam !== undefined ? { ...params, cursor: pageParam } : { ...params }).then((res) => res.data);
};

const useQuery = <TResponse>(url: Nullable<string>, params?: object, options?: QueryOptions<TResponse>) => {
  return _useQuery<TResponse, AxiosError<ApiError>, TResponse, QueryKey>([url!, params], (context: any) => fetcher<TResponse>(context), {
    enabled: !!url,
    ...options,
  });
};

const useInfiniteQuery = <TResponse>(url: Nullable<string>, params?: object, options?: InfiniteQueryOptions<TResponse>) => {
  return _useInfiniteQuery<CursorQueryResponse<TResponse, number>, AxiosError<ApiError>, CursorQueryResponse<TResponse, number>, QueryKey>(
    [url!, params],
    ({ pageParam = 0, ...rest }) => fetcher<CursorQueryResponse<TResponse, number>>({ pageParam, ...rest }),
    {
      ...options,
      getPreviousPageParam: (firstPage) => firstPage.previous,
      getNextPageParam: (lastPage) => lastPage.next,
    },
  );
};

export const useMutation = <TCached, TRequest, TResponse>(
  mutationFn: MutationFunction<TResponse, TRequest>,
  options?: UseMutationOptions<TResponse, AxiosError<ApiError>, TRequest>,
  queryKey?: QueryKey<TRequest>,
  updater?: (old: TCached, data: TRequest) => Optional<TCached>,
) => {
  const queryClient = useQueryClient();

  return _useMutation<TResponse, AxiosError<ApiError>, TRequest>(mutationFn, {
    ...options,
    onMutate: async (variables) => {
      options?.onMutate?.(variables);
      if (!queryKey) return;
      const builtQueryKey = buildQueryKey(queryKey, variables);
      console.log('The mutation has been executed.', builtQueryKey);

      // 낙관적 업데이트(쿼리 키가 없으면 실행되지 않음)
      // Optimistic update(does not run if query key is not present)
      await queryClient.cancelQueries(builtQueryKey);
      const previousData = queryClient.getQueryData(builtQueryKey);
      queryClient.setQueryData<TCached>(queryKey, (old) => {
        old && updater && console.log('Optimistic updates are run.', queryKey);
        return old && updater ? updater(old, variables) : old;
      });
      return previousData;
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      if (!queryKey) return;

      // 에러가 발생할 경우 이전 데이터로 되돌립니다.
      // If an error occurs, it returns to old data.
      queryClient.setQueryData(buildQueryKey(queryKey, variables), context);
    },
    onSettled: (data, err, variables, context) => {
      options?.onSettled?.(data, err, variables, context);
      if (!queryKey) return;

      // 쿼리를 무효화 합니다.
      // Invalidates the query.
      const queryKeyToInvalidate = buildQueryKey(queryKey, variables);
      console.log('The query has been invalidated.', queryKeyToInvalidate);
      queryClient.invalidateQueries(queryKeyToInvalidate);
    },
  });
};

/**
 * @example
 * url: "/api/system/user-management/1"
 * params: undefined
 * request: "/api/system/user-management/1"
 * queryKey: ["/api/system/user-management/1", undefined]
 * @description Fetch data
 * @param url Request URL
 * @param params Query parameters
 * @param options Query options
 * @returns Query result
 */
export const useFetch = <TResponse>(url: string, params?: object, options?: QueryOptions<TResponse>) => {
  return useQuery<TResponse>(url, params, options);
};

/**
 * @example
 * url: "/api/system/user-management"
 * params: { page: 1, limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/system/user-management?page=1&limit=10&sort=id&order=desc&search="
 * queryKey: ["/api/system/user-management", { page: 1, limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Fetch data by page
 * @param url Request URL
 * @param params Query parameters
 * @param options Query options
 * @returns Query result
 */
export const useGetPage = <TResponse>(url: string, params?: object, options?: PageQueryOptions<TResponse>) => {
  return useQuery<PageQueryResponse<TResponse>>(url, params, {
    ...options,
    keepPreviousData: false,
  });
};

/**
 * @example
 * url: "/api/system/user-management"
 * params: { limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/system/user-management?limit=10&sort=id&order=desc&search="
 * queryKey: ["/api/system/user-management", { limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Fetch data by cursor
 * @param url Request URL
 * @param params Query parameters
 * @param options Query options
 * @returns Infinite query result
 */
export const useLoadMore = <TResponse>(url: string, params?: object, options?: InfiniteQueryOptions<TResponse>) => {
  return useInfiniteQuery<TResponse>(url, params, options);
};

/**
 * @example
 * url: "/api/system/user-management"
 * params: { page: 1, limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/system/user-management"
 * invalidate queryKey: ["/api/system/user-management", { page: 1, limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Request to post data
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns Mutation result
 */
export const usePost = <TCached, TRequest extends object | void = void, TResponse = unknown>(
  url: UrlBuilder<TRequest>,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached,
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>((data) => Api.post<ApiResponse<TResponse>>(buildUrl(url, data), data ?? {}), options, [url, params], updater);
};

/**
 * @example
 * url: "/api/system/user-management/1"
 * params: undefined
 * request: "/api/system/user-management/1"
 * invalidate queryKey: ["/api/system/user-management/1", undefined]
 * @description Request to update data in the detail view
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns
 */
export const useUpdate = <TCached, TRequest extends object & { id?: ID }, TResponse = unknown>(
  url: UrlBuilder<TRequest>,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached,
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>((data) => Api.put<ApiResponse<TResponse>>(buildUrl(url, data), data), options, [url, params], updater);
};

/**
 * @example
 * url: "/api/system/user-management"
 * params: { page: 1, limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/system/user-management/1"
 * invalidate queryKey: ["/api/system/user-management", { page: 1, limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Request to update data in the list view
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns Mutation result
 */
export const useUpdateInList = <TCached, TRequest extends object & { id?: ID }, TResponse = unknown>(
  url: UrlBuilder<TRequest>,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached,
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>(
    (data) => {
      const { id, ...rest } = data;
      const builtUrl = buildUrl(url, data);
      return Api.put<ApiResponse<TResponse>>(id ? `${builtUrl}/${id}` : builtUrl, rest);
    },
    options,
    [url, params],
    updater,
  );
};

/**
 * @example
 * url: "/api/system/user-management"
 * params: { page: 1, limit: 10, sort: "id", order: "desc", search: "" }
 * request: "/api/system/user-management/1"
 * invalidate queryKey: ["/api/system/user-management", { page: 1, limit: 10, sort: "id", order: "desc", search: "" }]
 * @description Request to delete data
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns Mutation result
 */
export const useDelete = <TCached, TRequest = ID | void, TResponse = unknown>(
  url: string,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, id: TRequest) => TCached,
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>((id) => Api.delete<ApiResponse<TResponse>>(id ? `${url}/${id}` : url), options, [url, params], updater);
};

/**
 * @description Request to post form data
 * @param url Request URL
 * @param params Parameters to be used when creating the query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @returns Mutation result
 */
export const usePostForm = <TCached, TRequest extends FormData, TResponse = unknown>(
  url: UrlBuilder<TRequest>,
  params?: object,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached,
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>((data) => Api.postForm<ApiResponse<TResponse>>(buildUrl(url, data), data), options, [url, params], updater);
};

/**
 * @example
 * url: "/api/system/user-management/1/approve"
 * queryKey: ["/api/system/user-management", undefined]
 * request: "/api/system/user-management/1/approve"
 * invalidate queryKey: ["/api/system/user-management", undefined]
 * @description Send a command to the server
 * @param url Request URL
 * @param queryKey Query key to invalidate
 * @param options Mutation options
 * @param updater Updater function
 * @param method Request method
 * @returns Mutation result
 */
export const useCommand = <TCached, TRequest extends object & { id: ID }, TResponse = unknown>(
  url: UrlBuilder<TRequest>,
  queryKey?: QueryKey<TRequest>,
  options?: MutationOptions<TResponse, TRequest>,
  updater?: (old: TCached, data: TRequest) => TCached,
  method: 'POST' | 'PUT' | 'PATCH' = 'POST',
) => {
  return useMutation<TCached, TRequest, ApiResponse<TResponse>>(
    (data) => {
      switch (method) {
        case 'POST':
          return Api.post<ApiResponse<TResponse>>(buildUrl(url, data), data);
        case 'PUT':
          return Api.put<ApiResponse<TResponse>>(buildUrl(url, data), data);
        case 'PATCH':
          return Api.patch<ApiResponse<TResponse>>(buildUrl(url, data), data);
        default:
          throw new Error('Invalid method');
      }
    },
    options,
    queryKey,
    updater,
  );
};

export const useInvalidate = (url: string, params?: object) => {
  const queryClient = useQueryClient();
  const queryKeyToInvalidate = params ? [url, params] : [url];

  return () => {
    console.log('The query has been invalidated.', queryKeyToInvalidate);
    queryClient.invalidateQueries(queryKeyToInvalidate);
  };
};
