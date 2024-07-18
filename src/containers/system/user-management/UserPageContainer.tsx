/**
 * 유저 페이지 컨테이너
 *
 * @author 이성현
 */
import { useGetUsersAll, useResetUsers } from '@/apis/system/userManagement/userManagement';
import { Pagination } from '@/components';
import { UserTableContainer } from './UserTable';
import { usePagination } from '@/hooks';
import { TableContainer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const UserPageContainer = () => {
  const router = useRouter();
  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const { mutate: resetUsers } = useResetUsers();
  const { data: usersAll, isLoading: usersIsLoading } = useGetUsersAll();

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <UserTableContainer users={usersAll} isLoading={usersIsLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={usersAll?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default UserPageContainer;
