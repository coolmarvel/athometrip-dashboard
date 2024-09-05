import { useRouter } from 'next/router';

import { QueryParser } from '@/utils';
import { usePagination } from '@/hooks';
import { InfiniteList } from '@/components';
import { Post, useGetPostsByCursor } from '@/apis';

import { PostListItem } from '.';

interface PostsByCursorProps {
  usesObserver?: boolean;
}

const PostsByCursor = ({ usesObserver }: PostsByCursorProps) => {
  const router = useRouter();
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<Post>
      infiniteQuery={useGetPostsByCursor({ limit, sort, order, search: QueryParser.toString(router.query.search) ?? '' })}
      renderItem={PostListItem}
      usesObserver={usesObserver}
    />
  );
};

export default PostsByCursor;
