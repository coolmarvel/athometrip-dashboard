import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetMLBMetsByPage } from '@/apis';
import { MLBMetsTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const MLBMetsByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: mlbMetsByPage, isLoading: isLoading } = useGetMLBMetsByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <MLBMetsTable mlbMets={mlbMetsByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={mlbMetsByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default MLBMetsByPage;
