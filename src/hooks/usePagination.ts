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
  startDate?: string;
  endDate?: string;
}

const usePagination = () => {
  const { router, push } = useSafePush();

  const params = useMemo(() => {
    return {
      page: QueryParser.toNumber(router.query.page) ?? 1,
      limit: QueryParser.toNumber(router.query.limit) ?? 10,
      sort: QueryParser.toString(router.query.sort) ?? '',
      order: (QueryParser.toString(router.query.order) ?? 'desc') as Order,
      startDate: QueryParser.toString(router.query.startDate) ?? format(subMonths(new Date(), 1), 'yyyy-MM-dd', { locale: ko }),
      endDate: QueryParser.toString(router.query.endDate) ?? format(new Date(), 'yyyy-MM-dd', { locale: ko }),
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
