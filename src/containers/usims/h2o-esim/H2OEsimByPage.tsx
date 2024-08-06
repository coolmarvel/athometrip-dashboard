import { useRouter } from 'next/router';
import { TableContainer } from '@chakra-ui/react';

import { useGetH2OEsimByPage } from '@/apis';
import { H2OEsimTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const H2OEsimByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: h2oEsimByPage, isLoading: isLoading } = useGetH2OEsimByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <H2OEsimTable h2oEsim={h2oEsimByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={h2oEsimByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default H2OEsimByPage;
