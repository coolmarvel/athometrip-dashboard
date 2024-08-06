import { useGetPost } from '@/apis';
import { GaiaHead, ResponsiveLayout } from '@/components';
import { PostUpdateForm } from '@/containers';
import { QueryParser } from '@/utils';

import { useRouter } from 'next/router';

const EditPostPage = () => {
  const router = useRouter();
  const { data: post } = useGetPost(QueryParser.toNumber(router.query.id));

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>{post && <PostUpdateForm post={post} />}</ResponsiveLayout>
    </>
  );
};

export default EditPostPage;
