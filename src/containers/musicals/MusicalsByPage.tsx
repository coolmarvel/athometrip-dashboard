import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useGetMusicalsByPage, useResetMusicals } from '@/apis';
import { Pagination } from '@/components';
import { MusicalsTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const MusicalsByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetMusicals } = useResetMusicals();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: musicalsByPage, isLoading: isLoading } = useGetMusicalsByPage(params);

  useEffect(() => {
    resetMusicals();
  }, [before, resetMusicals]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <MusicalsTable musicals={musicalsByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={musicalsByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default MusicalsByPage;
