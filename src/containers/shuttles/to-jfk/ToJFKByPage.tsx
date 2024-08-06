import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetToJFKByPage } from '@/apis';
import { Pagination } from '@/components';
import { ToJFKTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const ToJFKByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: toJFKByPage, isLoading: isLoading } = useGetToJFKByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <ToJFKTable toJFK={toJFKByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={toJFKByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default ToJFKByPage;
