import { Order } from '@/apis';
import { QueryParser } from '@/utils';
import { useCallback, useMemo } from 'react';
import { useSafePush } from '.';
import { format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface OnPaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  after?: string;
  before?: string;
  product?: string;
  total?: number;
}

const usePagination = () => {
  const { router, push } = useSafePush();

  const params = useMemo(() => {
    return {
      page: QueryParser.toNumber(router.query.page) ?? 1,
      limit: QueryParser.toNumber(router.query.limit) ?? 10,
      sort: QueryParser.toString(router.query.sort) ?? '',
      order: (QueryParser.toString(router.query.order) ?? 'desc') as Order,
      after: QueryParser.toString(router.query.after) ?? format(subMonths(new Date(), 1), 'yyyy-MM-dd', { locale: ko }),
      before: QueryParser.toString(router.query.before) ?? format(new Date(), 'yyyy-MM-dd', { locale: ko }),
      product: QueryParser.toString(router.query.product) ?? '',
      total: QueryParser.toNumber(router.query.total) ?? 0,
    };
  }, [router.query]);

  const onPagination = useCallback<(params: OnPaginationParams) => void>(
    (params) => {
      push({ pathname: router.pathname, query: { ...router.query, ...params } });
    },
    [push, router.pathname, router.query]
  );

  return { ...params, onPagination };
};

export default usePagination;
