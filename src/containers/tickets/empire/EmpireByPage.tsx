import { useGetEmpireByPage, useResetEmpire } from '@/apis';
import { Pagination } from '@/components';
import { EmpireTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EmpireByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, startDate, endDate, onPagination } = usePagination();
  const { mutate: resetEmpire } = useResetEmpire();

  useEffect(() => {
    resetEmpire();
  }, [startDate, endDate, resetEmpire]);

  const { data: empireByPage, isLoading: isLoading } = useGetEmpireByPage({ page, limit, sort, order, startDate, endDate, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <EmpireTable empire={empireByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={empireByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default EmpireByPage;
