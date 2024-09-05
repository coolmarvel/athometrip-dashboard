import { Avatar, Box, Flex } from '@chakra-ui/react';

// import { Post } from '@/apis';
import { toUrl } from '@/utils';
import { useSafePush } from '@/hooks';
import { PageRoutes } from '@/constants';

interface PostWriterProps {
  // writer: Post['user'];
  writer: any;
}

const PostWriter = ({ writer }: PostWriterProps) => {
  const { push } = useSafePush();

  return (
    <Flex gap={'4'} align={'center'}>
      <Box
        cursor={'pointer'}
        _hover={{ opacity: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!writer) return;
          push(toUrl(PageRoutes.UserDetail, { id: writer.id }));
        }}
      >
        <Avatar name={writer?.name} src={writer?.profile} w={'10'} h={'10'} />
      </Box>
      {writer?.name}
    </Flex>
  );
};

export default PostWriter;
