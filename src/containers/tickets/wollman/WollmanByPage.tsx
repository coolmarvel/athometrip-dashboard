import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetWollmanByPage } from '@/apis';
import { WollmanTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const WollmanByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: wollmanByPage, isLoading: isLoading } = useGetWollmanByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <WollmanTable wollman={wollmanByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={wollmanByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default WollmanByPage;
