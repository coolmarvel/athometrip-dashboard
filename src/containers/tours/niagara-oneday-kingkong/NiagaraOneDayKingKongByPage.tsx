import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useGetNiagaraOneDayKingKongByPage } from '@/apis';
import { NiagaraOneDayKingKongTable } from '@/containers';
import { Pagination } from '@/components';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';

const NiagaraOneDayKingKongByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: niagaraByPage, isLoading: isLoading } = useGetNiagaraOneDayKingKongByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <NiagaraOneDayKingKongTable niagaraOneDayKingKong={niagaraByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={niagaraByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default NiagaraOneDayKingKongByPage;
