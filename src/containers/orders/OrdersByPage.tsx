import { useGetOrdersByPage } from '@/apis';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const OrdersByPage = () => {
  const router = useRouter();
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: ordersByPage, isLoading: ordersIsLoading } = useGetOrdersByPage({ page, limit, sort, order, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        {/* <TestTable posts={ordersByPage?.data ?? []} isLoading={ordersIsLoading} /> */}
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={ordersByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />{' '}
    </>
  );
};

export default OrdersByPage;
