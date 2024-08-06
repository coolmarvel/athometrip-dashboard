import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { TMobileEsimTable, TMobileUsimTable } from '@/containers';
import { useGetTMobileByPage } from '@/apis';
import { Pagination } from '@/components';
import { ModeQueries } from '@/constants';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const TMobileByPage = () => {
  const router = useRouter();
  const modeOption = router.query?.mode as ModeQueries;

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = {
    page,
    limit,
    sort,
    order,
    after,
    before,
    region: QueryParser.toString(router.query.region) ?? '',
    mode: QueryParser.toString(router.query.mode) ?? '',
    search: QueryParser.toString(router.query.search) ?? '',
  };
  const { data: tMobileByPage, isLoading: isLoading } = useGetTMobileByPage(params);

  const display = useMemo(() => {
    switch (modeOption) {
      case ModeQueries.Usim:
        return <TMobileUsimTable tMobile={tMobileByPage?.data ?? []} isLoading={isLoading} />;
      case ModeQueries.Esim:
        return <TMobileEsimTable tMobile={tMobileByPage?.data ?? []} isLoading={isLoading} />;
      default:
        return null;
    }
  }, [modeOption, tMobileByPage, isLoading]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        {display}
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={tMobileByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default TMobileByPage;
