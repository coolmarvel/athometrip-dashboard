import { useGetTestByPage } from '@/apis';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const TestByPage = () => {
  const router = useRouter();
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: testsByPage, isLoading: testsIsLoading } = useGetTestByPage({ page, limit, sort, order, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        {/* <TestTable posts={testsByPage?.data ?? []} isLoading={testsIsLoading} /> */}
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={testsByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />{' '}
    </>
  );
};

export default TestByPage;
