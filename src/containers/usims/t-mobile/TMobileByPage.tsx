import { useGetTMobileByPage, useResetTMobile } from '@/apis';
import { Pagination } from '@/components';
import { TMobileDailyTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TMobileByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetTMobile } = useResetTMobile();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: tMobileByPage, isLoading: isLoading } = useGetTMobileByPage(params);

  useEffect(() => {
    resetTMobile();
  }, [before, resetTMobile]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <TMobileDailyTable tMobileDaily={tMobileByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={tMobileByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default TMobileByPage;
