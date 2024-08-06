import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetWashingtonDCByPage } from '@/apis';
import { WashingtonDCTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const WashingtonDCByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: washingtonDCByPage, isLoading: isLoading } = useGetWashingtonDCByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <WashingtonDCTable washingtonDC={washingtonDCByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={washingtonDCByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default WashingtonDCByPage;
