import { useRouter } from 'next/router';
import { TableContainer } from '@chakra-ui/react';

import { QueryParser } from '@/utils';
import { usePagination } from '@/hooks';
import { UserTable } from '@/containers';
import { Pagination } from '@/components';
import { useGetUsersByPage } from '@/apis';

const UsersByPage = () => {
  const router = useRouter();
  const { page, limit, sort, order, onPagination } = usePagination();
  const { data: usersByPage, isLoading: usersIsLoading } = useGetUsersByPage({ page, limit, sort, order, search: QueryParser.toString(router.query.search) ?? '' });

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <UserTable users={usersByPage?.data ?? []} isLoading={usersIsLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={usersByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default UsersByPage;
