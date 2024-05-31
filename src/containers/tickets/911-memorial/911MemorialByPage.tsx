import { useGet911MemorialByPage } from '@/apis';
import { Pagination } from '@/components';
import { Memorial911Table } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Memorial911ByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, product, total, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, total, product, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: memorial911ByPage, isLoading: isLoading } = useGet911MemorialByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <Memorial911Table memorial911={memorial911ByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={memorial911ByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default Memorial911ByPage;
