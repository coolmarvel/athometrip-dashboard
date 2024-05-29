import { useGetEllisIslandByPage, useResetEllisIsland } from '@/apis';
import { Pagination } from '@/components';
import { EllisIslandTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EllisIslandByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, startDate, endDate, onPagination } = usePagination();
  const { mutate: resetEllisIsland } = useResetEllisIsland();

  useEffect(() => {
    resetEllisIsland();
  }, [startDate, endDate, resetEllisIsland]);

  const { data: ellisIslandByPage, isLoading: isLoading } = useGetEllisIslandByPage({ page, limit, sort, order, startDate, endDate, search: QueryParser.toString(router.query.search) ?? '' });

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
