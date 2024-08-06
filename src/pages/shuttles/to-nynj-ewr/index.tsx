import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { ToNYNJEWRByPage } from '@/containers';
import { useResetToNYNJEWR } from '@/apis';
import { useSafePush } from '@/hooks';

const ToNYNJEWRPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToNYNJEWR } = useResetToNYNJEWR();

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
              <DatePickerOptions setMutate={resetToNYNJEWR} />
              <PageOptions />
            </Flex>
          </Flex>
          <ToNYNJEWRByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNJEWRPages;
