import { useGetTopOfTheRockByPage } from '@/apis';
import { Pagination } from '@/components';
import { TopOfTheRockTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const TopOfTheRockByPage = () => {
  const router = useRouter();
  const { page, limit, sort, order, startDate, endDate, onPagination } = usePagination();

  const { data: topOfTheRockByPage, isLoading: isLoading } = useGetTopOfTheRockByPage({ page, limit, sort, order, startDate, endDate, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <TopOfTheRockTable topOfTheRock={topOfTheRockByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={topOfTheRockByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default TopOfTheRockByPage;
