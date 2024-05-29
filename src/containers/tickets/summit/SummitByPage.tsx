import { useGetSummitByPage, useResetSummit } from '@/apis';
import { Pagination } from '@/components';
import { SummitTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SummitByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, startDate, endDate, onPagination } = usePagination();
  const { mutate: resetSummit } = useResetSummit();

  useEffect(() => {
    resetSummit();
  }, [startDate, endDate, resetSummit]);

  const { data: summitByPage, isLoading: isLoading } = useGetSummitByPage({ page, limit, sort, order, startDate, endDate, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <SummitTable summit={summitByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={summitByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default SummitByPage;
