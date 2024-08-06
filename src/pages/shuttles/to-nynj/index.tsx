import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { ToNYNJByPage } from '@/containers';
import { useResetToNYNJ } from '@/apis';
import { useSafePush } from '@/hooks';

const ToNYNJPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToNYNJ } = useResetToNYNJ();

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
              <DatePickerOptions setMutate={resetToNYNJ} />
              <PageOptions />
            </Flex>
          </Flex>
          <ToNYNJByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNJPages;
