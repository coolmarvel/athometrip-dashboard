import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetToJFKNightByPage } from '@/apis';
import { ToJFKNightTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const ToJFKNightByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: toJFKByPage, isLoading: isLoading } = useGetToJFKNightByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <ToJFKNightTable toJFKNight={toJFKByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={toJFKByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default ToJFKNightByPage;
