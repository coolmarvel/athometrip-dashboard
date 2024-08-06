import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetOneWorldByPage } from '@/apis';
import { OneWorldTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const OneWorldByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: oneWorldByPage, isLoading: isLoading } = useGetOneWorldByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <OneWorldTable oneWorld={oneWorldByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={oneWorldByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default OneWorldByPage;
