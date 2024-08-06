import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetSingleDocentsByPage } from '@/apis';
import { SingleDocentsTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const SingleDocentsByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: singleDocentsByPage, isLoading: isLoading } = useGetSingleDocentsByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <SingleDocentsTable singleDocents={singleDocentsByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={singleDocentsByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default SingleDocentsByPage;
