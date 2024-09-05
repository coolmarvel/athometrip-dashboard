import { useRouter } from 'next/router';

import { QueryParser } from '@/utils';
import { usePagination } from '@/hooks';
import { InfiniteList } from '@/components';
import { User, useGetUsersByCursor } from '@/apis';

import { UserListItem } from '.';

interface UsersByCursorProps {
  usesObserver?: boolean;
}

const UsersByCursor = ({ usesObserver }: UsersByCursorProps) => {
  const router = useRouter();
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<User>
      infiniteQuery={useGetUsersByCursor({ limit, sort, order, search: QueryParser.toString(router.query.search) ?? '' })}
      renderItem={UserListItem}
      usesObserver={usesObserver}
    />
  );
};

export default UsersByCursor;
