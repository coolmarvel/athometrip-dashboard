import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetWhitneyDocentByPage } from '@/apis';
import { WhitneyDocentTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const WhitneyDocentByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: whitneyDocentByPage, isLoading: isLoading } = useGetWhitneyDocentByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <WhitneyDocentTable whitneyDocent={whitneyDocentByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={whitneyDocentByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default WhitneyDocentByPage;
