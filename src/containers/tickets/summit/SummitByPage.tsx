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

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetSummit } = useResetSummit();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: summitByPage, isLoading: isLoading } = useGetSummitByPage(params);

  useEffect(() => {
    resetSummit();
  }, [after, before, resetSummit]);

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
