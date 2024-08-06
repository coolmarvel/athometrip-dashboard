import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetToNYNJEWRByPage } from '@/apis';
import { ToNYNJEWRTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const ToNYNJEWRByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: toNYNJEWRByPage, isLoading: isLoading } = useGetToNYNJEWRByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <ToNYNJEWRTable toNYNJEWR={toNYNJEWRByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={toNYNJEWRByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default ToNYNJEWRByPage;
