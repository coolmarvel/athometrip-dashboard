import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useGetToEWRByPage, useResetToEWR } from '@/apis';
import { Pagination } from '@/components';
import { ToEWRTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const ToEWRByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetToEWR } = useResetToEWR();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: toEWRByPage, isLoading: isLoading } = useGetToEWRByPage(params);

  useEffect(() => {
    resetToEWR();
  }, [before, resetToEWR]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <ToEWRTable toEWR={toEWRByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={toEWRByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default ToEWRByPage;
