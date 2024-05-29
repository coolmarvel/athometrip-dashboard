import { useGetWollmanByPage, useResetWollman } from '@/apis';
import { Pagination } from '@/components';
import { WollmanTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const WollmanByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, startDate, endDate, onPagination } = usePagination();
  const { mutate: resetWollman } = useResetWollman();

  useEffect(() => {
    resetWollman();
  }, [startDate, endDate, resetWollman]);

  const { data: wollmanByPage, isLoading: isLoading } = useGetWollmanByPage({ page, limit, sort, order, startDate, endDate, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <WollmanTable wollman={wollmanByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={wollmanByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default WollmanByPage;
