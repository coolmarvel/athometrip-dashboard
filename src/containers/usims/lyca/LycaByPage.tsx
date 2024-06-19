import { useGetLycaByPage, useResetLyca } from '@/apis';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LycaTable } from './LycaTable';

const LycaByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetLyca } = useResetLyca();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: lycaByPage, isLoading: isLoading } = useGetLycaByPage(params);

  useEffect(() => {
    resetLyca();
  }, [before, resetLyca]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <LycaTable lyca={lycaByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={lycaByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default LycaByPage;
