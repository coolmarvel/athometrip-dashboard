import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { ToNYNightByPage } from '@/containers';
import { useResetToNYNight } from '@/apis';
import { useSafePush } from '@/hooks';

const ToNYNightPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToNYNight } = useResetToNYNight();

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
              <DatePickerOptions setMutate={resetToNYNight} />
              <PageOptions />
            </Flex>
          </Flex>
          <ToNYNightByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNightPages;
