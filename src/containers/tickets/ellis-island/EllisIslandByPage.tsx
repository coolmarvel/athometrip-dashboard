import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetEllisIslandByPage } from '@/apis';
import { EllisIslandTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const EllisIslandByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: ellisIslandByPage, isLoading: isLoading } = useGetEllisIslandByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <EllisIslandTable ellisIsland={ellisIslandByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={ellisIslandByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default EllisIslandByPage;
