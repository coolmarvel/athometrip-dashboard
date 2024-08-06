import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { Memorial911ByPage } from '@/containers';
import { useReset911Memorial } from '@/apis';
import { useSafePush } from '@/hooks';

const Memorial911Pages = () => {
  const { router, push } = useSafePush();
  const { mutate: reset911Memorial } = useReset911Memorial();

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
              <DatePickerOptions setMutate={reset911Memorial} />
              <PageOptions />
            </Flex>
          </Flex>
          <Memorial911ByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default Memorial911Pages;
