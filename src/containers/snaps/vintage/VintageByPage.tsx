import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetVintageByPage } from '@/apis';
import { VintageTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const VintageByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: modernByPage, isLoading: isLoading } = useGetVintageByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <VintageTable vintage={modernByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={modernByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default VintageByPage;
