import { Box, TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetMomaDocentByPage } from '@/apis';
import { MomaDocentTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const MomaDocentByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: momaDocentByPage, isLoading: isLoading } = useGetMomaDocentByPage(params);

  return (
    <>
      <Box maxH="calc(525px)" overflowY="auto" overflowX="auto" borderWidth="1px" borderRadius="md" borderColor="gray.200">
        <TableContainer flex={1} overflowY={'auto'}>
          <MomaDocentTable momaDocent={momaDocentByPage?.data ?? []} isLoading={isLoading} />
        </TableContainer>
      </Box>
      <Pagination currentPage={page} limit={limit} total={momaDocentByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default MomaDocentByPage;
