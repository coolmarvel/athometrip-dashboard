import { useGetNiagaraByPage, useResetNiagara } from '@/apis';
import { Pagination } from '@/components';
import { NiagaraTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NiagaraByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetNiagara } = useResetNiagara();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: niagaraByPage, isLoading: isLoading } = useGetNiagaraByPage(params);

  useEffect(() => {
    resetNiagara();
  }, [before, resetNiagara]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <NiagaraTable niagara={niagaraByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={niagaraByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default NiagaraByPage;
