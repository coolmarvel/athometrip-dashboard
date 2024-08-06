import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetMetroDocentByPage } from '@/apis';
import { MetroDocentTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const MetroDocentByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: metroDocentByPage, isLoading: isLoading } = useGetMetroDocentByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <MetroDocentTable metroDocent={metroDocentByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={metroDocentByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default MetroDocentByPage;
