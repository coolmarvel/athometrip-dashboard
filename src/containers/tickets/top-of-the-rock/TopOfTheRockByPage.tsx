import { useGetTopOfTheRockByPage, useResetTopOfTheRock } from '@/apis';
import { Pagination } from '@/components';
import { TopOfTheRockTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TopOfTheRockByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetTopOfTheRock } = useResetTopOfTheRock();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: topOfTheRockByPage, isLoading: isLoading } = useGetTopOfTheRockByPage(params);

  useEffect(() => {
    resetTopOfTheRock();
  }, [before, resetTopOfTheRock]);

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
