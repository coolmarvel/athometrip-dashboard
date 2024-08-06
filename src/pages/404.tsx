import { useRouter } from 'next/router';
import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react';

import { GaiaHead } from '@/components';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <>
      <GaiaHead />
      <Center flexDirection={'column'} w={'100vw'} h={'100vh'} gap={'8'} pb={'20'}>
        <Flex direction={'column'} gap={'2'} align={'center'}>
          <Heading>404</Heading>
          <Text fontSize={'lg'}>This page could not be found.</Text>
        </Flex>
        <Button onClick={router.back}>Go back</Button>
      </Center>
    </>
  );
};

export default NotFoundPage;
