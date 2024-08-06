import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetModernByPage } from '@/apis';
import { Pagination } from '@/components';
import { ModernTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const ModernByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: modernByPage, isLoading: isLoading } = useGetModernByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <ModernTable modern={modernByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={modernByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default ModernByPage;
