import { DatePickerOptions, PageOptions, ResponsiveLayout, Search } from '@/components';
import { MetroDocentByPage } from '@/containers';
import { useSafePush } from '@/hooks';
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';

const MetroDocentPages = () => {
  const { router, push } = useSafePush();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveLayout>
        <Flex direction={'column'} gap={'4'} h={'100%'}>
          <Flex justifyContent={'space-between'} gap={'4'} wrap={'wrap'}>
            <Search
              onSubmit={(search) => {
                push({ pathname: router.pathname, query: { ...router.query, search } });
              }}
            />
            <Flex gap={'4'}>
              <DatePickerOptions />
              <PageOptions />
            </Flex>
          </Flex>
          <MetroDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MetroDocentPages;
