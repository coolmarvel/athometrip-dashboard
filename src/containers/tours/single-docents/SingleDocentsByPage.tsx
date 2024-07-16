import { useGetSingleDocentsByPage, useResetSingleDocents } from '@/apis';
import { Pagination } from '@/components';
import { SingleDocentsTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SingleDocentsByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetSingleDocents } = useResetSingleDocents();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: singleDocentsByPage, isLoading: isLoading } = useGetSingleDocentsByPage(params);

  useEffect(() => {
    resetSingleDocents();
  }, [before, resetSingleDocents]);

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
