import { useGetTMobileDailyByPage, useResetTMobileDaily } from '@/apis';
import { Pagination } from '@/components';
import { TMobileDailyTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TMobileDailyByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetTMobileDaily } = useResetTMobileDaily();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: tMobileDailyByPage, isLoading: isLoading } = useGetTMobileDailyByPage(params);

  useEffect(() => {
    resetTMobileDaily();
  }, [before, resetTMobileDaily]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <TMobileDailyTable tMobileDaily={tMobileDailyByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={tMobileDailyByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default TMobileDailyByPage;
