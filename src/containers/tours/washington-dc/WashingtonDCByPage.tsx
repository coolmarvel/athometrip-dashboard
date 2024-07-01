import { useGetWashingtonDCByPage, useResetWashingtonDC } from '@/apis';
import { Pagination } from '@/components';
import { WashingtonDCTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const WashingtonDCByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetWashingtonDC } = useResetWashingtonDC();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: washingtonDCByPage, isLoading: isLoading } = useGetWashingtonDCByPage(params);

  useEffect(() => {
    resetWashingtonDC();
  }, [before, resetWashingtonDC]);

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
