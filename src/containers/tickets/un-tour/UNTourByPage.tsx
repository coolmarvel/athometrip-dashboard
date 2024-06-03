import { useGetUNTourByPage, useResetUNTour } from '@/apis';
import { Pagination } from '@/components';
import { UNTourTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const UNTourByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetUNTour } = useResetUNTour();

  useEffect(() => {
    resetUNTour();
  }, [after, before, resetUNTour]);

  const { data: unTourByPage, isLoading: isLoading } = useGetUNTourByPage({ page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <UNTourTable unTour={unTourByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={unTourByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default UNTourByPage;
