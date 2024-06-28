import { useGetWhitneyDocentByPage, useResetWhitneyDocent } from '@/apis';
import { Pagination } from '@/components';
import { WhitneyDocentTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const WhitneyDocentByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetWhitneyDocent } = useResetWhitneyDocent();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: whitneyDocentByPage, isLoading: isLoading } = useGetWhitneyDocentByPage(params);

  useEffect(() => {
    resetWhitneyDocent();
  }, [before, resetWhitneyDocent]);

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
