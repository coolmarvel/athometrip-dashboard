import { TbEdit } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Skeleton } from '@chakra-ui/react';

import { toUrl } from '@/utils';
import { useSafePush } from '@/hooks';
import { useModalStore } from '@/stores';
import { useDeletePost, useGetMe } from '@/apis';
import { PageRoutes, defaultQuery } from '@/constants';

import { PostWriter } from '../PostWriter';

interface PostCardProps {
  data?: any;
}

const PostCard = ({ data: post }: PostCardProps) => {
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  const { t } = useTranslation();
  const { openConfirm } = useModalStore(['openConfirm']);
  const { mutate: deletePost } = useDeletePost();

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!post}>
          <Flex justify={'space-between'}>
            <PostWriter post={post} />
            {me?.id === post?.userId && (
              <Flex gap={'4'}>
                <Button rightIcon={<TbEdit />} onClick={() => push(toUrl(PageRoutes.EditPost, { id: post?.id }))}>
                  {t('Edit')}
                </Button>
                <Button
                  rightIcon={<TbEdit />}
                  onClick={() => {
                    if (!post?.id) return;
                    openConfirm({
                      title: t('Delete Post'),
                      content: t('Are you sure you want to delete this post?'),
                      onConfirm: () =>
                        deletePost(post?.id, {
                          onSuccess: () => {
                            push({ pathname: toUrl(PageRoutes.Posts), query: defaultQuery });
                          },
                        }),
                    });
                  }}
                >
                  {t('Delete')}
                </Button>
              </Flex>
            )}
          </Flex>
        </Skeleton>
      </CardHeader>
      <CardBody>
        <Skeleton isLoaded={!!post}>
          <Heading mb={'4'} size={'md'}>
            {post?.title ?? t('Title')}
          </Heading>
        </Skeleton>
        <Skeleton isLoaded={!!post}>
          <Box dangerouslySetInnerHTML={{ __html: post?.content ?? t('Content') }} />
        </Skeleton>
      </CardBody>
    </Card>
  );
};

export default PostCard;
