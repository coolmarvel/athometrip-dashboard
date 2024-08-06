import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetTopOfTheRockByPage } from '@/apis';
import { TopOfTheRockTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const TopOfTheRockByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: topOfTheRockByPage, isLoading: isLoading } = useGetTopOfTheRockByPage(params);

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
