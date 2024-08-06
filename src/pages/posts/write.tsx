import { GaiaHead, ResponsiveLayout } from '@/components';
import { PostCreateForm } from '@/containers';

const WritePostPage = () => {
  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <PostCreateForm />
      </ResponsiveLayout>
    </>
  );
};

export default WritePostPage;
