import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { BostonByPage } from '@/containers';
import { useResetBoston } from '@/apis';
import { useSafePush } from '@/hooks';

const BostonPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetBoston } = useResetBoston();

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Flex direction={'column'} gap={'4'} h={'100%'}>
          <Flex justifyContent={'space-between'} gap={'4'} wrap={'wrap'}>
            <Search
              onSubmit={(search) => {
                push({ pathname: router.pathname, query: { ...router.query, search } });
              }}
            />
            <Flex gap={'4'}>
              <DatePickerOptions setMutate={resetBoston} />
              <PageOptions />
            </Flex>
          </Flex>
          <BostonByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default BostonPages;
