import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useGetToNYNightByPage, useResetToNYNight } from '@/apis';
import { Pagination } from '@/components';
import { ToNYNightTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const ToNYNightByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetToNYNight } = useResetToNYNight();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: toNYNightByPage, isLoading: isLoading } = useGetToNYNightByPage(params);

  useEffect(() => {
    resetToNYNight();
  }, [before, resetToNYNight]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <ToNYNightTable toNYNight={toNYNightByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={toNYNightByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default ToNYNightByPage;
