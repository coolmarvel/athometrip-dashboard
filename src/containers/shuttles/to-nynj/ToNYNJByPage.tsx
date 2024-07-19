import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useGetToNYNJByPage, useResetToNYNJ } from '@/apis';
import { Pagination } from '@/components';
import { ToNYNJTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const ToNYNJByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetToNYNJ } = useResetToNYNJ();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: toNYNJByPage, isLoading: isLoading } = useGetToNYNJByPage(params);

  useEffect(() => {
    resetToNYNJ();
  }, [before, resetToNYNJ]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <ToNYNJTable toNYNJ={toNYNJByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={toNYNJByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default ToNYNJByPage;
