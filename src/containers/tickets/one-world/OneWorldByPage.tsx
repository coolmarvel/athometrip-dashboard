import { useGetOneWorldByPage, useResetOneWorld } from '@/apis';
import { Pagination } from '@/components';
import { OneWorldTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const OneWorldByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, startDate, endDate, onPagination } = usePagination();
  const { mutate: resetOneWorld } = useResetOneWorld();

  useEffect(() => {
    resetOneWorld();
  }, [startDate, endDate, resetOneWorld]);

  const { data: oneWorldByPage, isLoading: isLoading } = useGetOneWorldByPage({ page, limit, sort, order, startDate, endDate, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <OneWorldTable oneWorld={oneWorldByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={oneWorldByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default OneWorldByPage;
