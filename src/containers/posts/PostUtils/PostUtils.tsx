import { useCallback } from 'react';
import { TbPlus } from 'react-icons/tb';
import { GrPowerReset } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Tooltip } from '@chakra-ui/react';

import { getRandomString, toUrl } from '@/utils';
import { ApiRoutes, PageRoutes } from '@/constants';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { useCreatePost, useCreateTestPosts, useGetMe, useResetTestPosts } from '@/apis';

const count = 100;

const PostsUtils = () => {
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  const { t } = useTranslation();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Post));
  const { mutate: resetTestPosts, isLoading: resetTestPostsIsLoading } = useResetTestPosts();
  const { mutate: createPost, isLoading: createPostIsLoading } = useCreatePost(queryKeyParams);
  const { mutate: createTestPosts, isLoading: createTestPostsIsLoading } = useCreateTestPosts(count);

  const handleCreatePost = useCallback(() => {
    push(PageRoutes.WritePost);
  }, [push]);

  const handleCreateRandomPost = useCallback(() => {
    if (!me) return;

    createPost({ title: getRandomString(10), content: getRandomString(100), userId: me.id });
  }, [createPost, me]);

  const handleCreateTestPosts = useCallback(() => {
    createTestPosts();
  }, [createTestPosts]);

  const handleResetTestPosts = useCallback(() => {
    resetTestPosts();
  }, [resetTestPosts]);

  return (
    <Flex gap={'4'} wrap={'wrap'}>
      <Tooltip hasArrow label={t('Create Post')}>
        <Button leftIcon={<TbPlus />} onClick={handleCreatePost}>
          {t('Post')}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t('Create Random Post')}>
        <Button variant={'outline'} leftIcon={<TbPlus />} onClick={handleCreateRandomPost} isLoading={createPostIsLoading} isDisabled={createPostIsLoading}>
          {t('Random Post')}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t('Create Posts for Test', { count })}>
        <Button variant={'outline'} leftIcon={<TbPlus />} onClick={handleCreateTestPosts} isLoading={createTestPostsIsLoading} isDisabled={createTestPostsIsLoading}>
          {`${count} ${t('Posts')}`}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t('Reset All Posts')}>
        <Button variant={'outline'} leftIcon={<GrPowerReset />} onClick={handleResetTestPosts} isLoading={resetTestPostsIsLoading} isDisabled={resetTestPostsIsLoading}>
          {t('Posts')}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default PostsUtils;
