import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardBody, CardHeader, Flex, Heading } from '@chakra-ui/react';

import { toUrl } from '@/utils';
import { PageRoutes } from '@/constants';
import { useAlphaColor, useSafePush } from '@/hooks';

import { PostWriter } from '../PostWriter';

interface PostListItemProps {
  data: any;
}

const PostListItem = ({ data: post }: PostListItemProps) => {
  const { push } = useSafePush();
  const alphaColor = useAlphaColor();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    push(toUrl(PageRoutes.PostDetail, { id: post.id }));
  }, [push, post]);

  return (
    <Card direction={'row'} onClick={handleClick} cursor={'pointer'} _hover={{ backgroundColor: alphaColor(50) }}>
      <Flex flex={1} direction={'column'}>
        <CardHeader>
          <PostWriter post={post} />
        </CardHeader>
        <CardBody>
          <Heading mb={'4'} size={'md'}>
            {post.title ?? t('Title')}
          </Heading>
          <Box
            dangerouslySetInnerHTML={{ __html: post?.content ?? 'Content' }}
            __css={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
            }}
          />
        </CardBody>
      </Flex>
    </Card>
  );
};

export default PostListItem;
