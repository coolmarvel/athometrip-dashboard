import { useGetMomaDocentByPage, useResetMomaDocent } from '@/apis';
import { Pagination } from '@/components';
import { MomaDocentTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MomaDocentByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetMomaDocent } = useResetMomaDocent();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: momaDocentByPage, isLoading: isLoading } = useGetMomaDocentByPage(params);

  useEffect(() => {
    resetMomaDocent();
  }, [before, resetMomaDocent]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <MomaDocentTable momaDocent={momaDocentByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={momaDocentByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default MomaDocentByPage;
