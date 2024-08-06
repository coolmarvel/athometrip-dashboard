import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { OneWorldByPage } from '@/containers';
import { useResetOneWorld } from '@/apis';
import { useSafePush } from '@/hooks';

const OneWorldPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetOneWorld } = useResetOneWorld();

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
              <DatePickerOptions setMutate={resetOneWorld} />
              <PageOptions />
            </Flex>
          </Flex>
          <OneWorldByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default OneWorldPages;
