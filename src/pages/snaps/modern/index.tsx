import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { ModernByPage } from '@/containers';
import { useResetModern } from '@/apis';
import { useSafePush } from '@/hooks';

const ModernPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetModern } = useResetModern();

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
              <DatePickerOptions setMutate={resetModern} />
              <PageOptions />
            </Flex>
          </Flex>
          <ModernByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ModernPages;
