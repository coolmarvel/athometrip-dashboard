import { useGet911MemorialByPage, useReset911Memorial } from '@/apis';
import { Pagination } from '@/components';
import { Memorial911Table } from '@/containers';
import { usePagination } from '@/hooks';
import { useTicketStore } from '@/stores';
import { QueryParser } from '@/utils';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Memorial911ByPage = () => {
  const router = useRouter();

  const { tickets, activeTicket } = useTicketStore(['tickets', 'activeTicket']);
  const { setTickets, setActiveTicket } = useTicketStore(['setTickets', 'setActiveTicket']);
  const { page, limit, sort, order, after, before, product, total, onPagination } = usePagination();
  const { mutate: resetMemorial911 } = useReset911Memorial();

  const params = { page, limit, sort, order, after, before, product, total, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: memorial911ByPage, isLoading: isLoading } = useGet911MemorialByPage(params);

  useEffect(() => {
    const resetResult = resetMemorial911();
    console.log(resetResult);
  }, [after, before, resetMemorial911]);

  useEffect(() => {
    setActiveTicket(memorial911ByPage?.product);
    setTickets(memorial911ByPage?.data);
  }, [memorial911ByPage, setActiveTicket, setTickets]);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <Memorial911Table memorial911={memorial911ByPage?.data ?? []} isLoading={isLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={memorial911ByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default Memorial911ByPage;
