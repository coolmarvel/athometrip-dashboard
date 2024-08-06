import { useGetPost } from '@/apis';
import { GaiaHead, ResponsiveLayout } from '@/components';
import { PostCard } from '@/containers';
import { useHasScroll } from '@/hooks';
import { QueryParser } from '@/utils';
import { Box } from '@chakra-ui/react';

import { useRouter } from 'next/router';

const PostPage = () => {
  const router = useRouter();
  const { data: post } = useGetPost(QueryParser.toNumber(router.query.id));
  const { ref, hasScroll } = useHasScroll();

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Box ref={ref} overflowY={'auto'} p={'0.5'} pr={hasScroll ? '2' : '0.5'}>
          <PostCard data={post} />
        </Box>
      </ResponsiveLayout>
    </>
  );
};

export default PostPage;
