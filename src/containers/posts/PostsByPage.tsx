import { useRouter } from 'next/router';
import { TableContainer } from '@chakra-ui/react';

import { QueryParser } from '@/utils';
import { usePagination } from '@/hooks';
import { PostTable } from '@/containers';
import { Pagination } from '@/components';
import { useGetPostsByPage } from '@/apis';

const PostsByPage = () => {
  const router = useRouter();
  const { page, limit, sort, order, onPagination } = usePagination();

  const params = { page, limit, sort, order, search: QueryParser.toString(router.query.search) ?? '' };
  const { data: postsByPage, isLoading: postsIsLoading } = useGetPostsByPage(params);

  return (
    <>
      <TableContainer flex={1} overflowY={'auto'}>
        <PostTable posts={postsByPage?.data ?? []} isLoading={postsIsLoading} />
      </TableContainer>
      <Pagination currentPage={page} limit={limit} total={postsByPage?.total ?? 0} onChange={(page) => onPagination({ page })} />
    </>
  );
};

export default PostsByPage;
