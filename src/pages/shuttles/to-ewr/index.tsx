import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { ToEWRByPage } from '@/containers';
import { useSafePush } from '@/hooks';
import { useResetToEWR } from '@/apis';

const ToEWRPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToEWR } = useResetToEWR();

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
              <DatePickerOptions setMutate={resetToEWR} />
              <PageOptions />
            </Flex>
          </Flex>
          <ToEWRByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToEWRPages;
