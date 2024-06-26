import { useGetGuggenheimDocentByPage, useResetGuggenheimDocent } from '@/apis';
import { Pagination } from '@/components';
import { GuggenheimDocentTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const GuggenheimDocentByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetGuggenheimDocent } = useResetGuggenheimDocent();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: guggenheimDocentByPage, isLoading: isLoading } = useGetGuggenheimDocentByPage(params);

  useEffect(() => {
    resetGuggenheimDocent();
  }, [before, resetGuggenheimDocent]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <GuggenheimDocentTable guggenheimDocent={guggenheimDocentByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={guggenheimDocentByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default GuggenheimDocentByPage;
