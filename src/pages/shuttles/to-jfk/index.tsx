import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { ToJFKByPage } from '@/containers';
import { useResetToJFK } from '@/apis';
import { useSafePush } from '@/hooks';

const ToJFKPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToJFK } = useResetToJFK();

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
              <DatePickerOptions setMutate={resetToJFK} />
              <PageOptions />
            </Flex>
          </Flex>
          <ToJFKByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToJFKPages;
