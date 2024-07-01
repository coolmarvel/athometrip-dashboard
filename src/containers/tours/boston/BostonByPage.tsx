import { useGetBostonByPage, useResetBoston } from '@/apis';
import { Pagination } from '@/components';
import { BostonTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const BostonByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetBoston } = useResetBoston();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: bostonByPage, isLoading: isLoading } = useGetBostonByPage(params);

  useEffect(() => {
    resetBoston();
  }, [before, resetBoston]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <BostonTable boston={bostonByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={bostonByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default BostonByPage;
