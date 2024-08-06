import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetAMNHDocentByPage } from '@/apis';
import { AMNHDocentTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const AMNHDocentByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: amnhDocentByPage, isLoading: isLoading } = useGetAMNHDocentByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <AMNHDocentTable amnhDocent={amnhDocentByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={amnhDocentByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default AMNHDocentByPage;
