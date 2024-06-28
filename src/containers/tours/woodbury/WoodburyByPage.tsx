import { useGetWoodburyByPage, useResetWoodbury } from '@/apis';
import { Pagination } from '@/components';
import { WoodburyTable } from '@/containers';
import { usePagination } from '@/hooks';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const WoodburyByPage = () => {
  const router = useRouter();

  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetWoodbury } = useResetWoodbury();

  const params = { page, limit, sort, order, after, before, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: woodburyByPage, isLoading: isLoading } = useGetWoodburyByPage(params);

  useEffect(() => {
    resetWoodbury();
  }, [before, resetWoodbury]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <WoodburyTable woodbury={woodburyByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={woodburyByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default WoodburyByPage;
