import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { WollmanByPage } from '@/containers';
import { useResetWollman } from '@/apis';
import { useSafePush } from '@/hooks';

const WollmanPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetWollman } = useResetWollman();

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
              <DatePickerOptions setMutate={resetWollman} />
              <PageOptions />
            </Flex>
          </Flex>
          <WollmanByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WollmanPages;
