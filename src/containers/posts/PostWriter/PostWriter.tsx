import { useTranslation } from 'react-i18next';
import { Avatar, Flex, Text } from '@chakra-ui/react';

import { toUrl } from '@/utils';
import { PageRoutes } from '@/constants';
import { useFormatDate, useSafePush } from '@/hooks';

interface PostWriterProps {
  post?: any;
}

const PostWriter = ({ post }: PostWriterProps) => {
  const { push } = useSafePush();
  const { original } = useFormatDate();
  const { t } = useTranslation();

  const user = post?.user;

  return (
    <Flex gap={'4'} align={'center'}>
      <Avatar
        name={user?.name}
        src={user?.profile}
        w={'10'}
        h={'10'}
        cursor={'pointer'}
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!user) return;
          push(toUrl(PageRoutes.UserDetail, { id: user.id }));
        }}
      />
      <Flex direction={'column'} gap={'2'}>
        {user ? <Text>{`${user.name ?? t('User Name')} (${user.email ?? t('User Email')})`}</Text> : <Text>{t('Deleted User')}</Text>}
        <Text>{post?.createdAt ? original(post?.createdAt) : t('Created At')}</Text>
      </Flex>
    </Flex>
  );
};

export default PostWriter;
