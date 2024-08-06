import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetMetroDocentPaintingByPage } from '@/apis';
import { MetroDocentPaintingTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const MetroDocentPaintingByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: metroDocentPaintingByPage, isLoading: isLoading } = useGetMetroDocentPaintingByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <MetroDocentPaintingTable metroDocentPainting={metroDocentPaintingByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={metroDocentPaintingByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default MetroDocentPaintingByPage;
