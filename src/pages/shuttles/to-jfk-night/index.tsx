import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { ToJFKNightByPage } from '@/containers';
import { useResetToJFKNight } from '@/apis';
import { useSafePush } from '@/hooks';

const ToJFKNightPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToJFKNight } = useResetToJFKNight();

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
              <DatePickerOptions setMutate={resetToJFKNight} />
              <PageOptions />
            </Flex>
          </Flex>
          <ToJFKNightByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToJFKNightPages;
