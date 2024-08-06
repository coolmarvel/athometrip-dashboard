import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { LycaByPage } from '@/containers';
import { useResetLyca } from '@/apis';
import { useSafePush } from '@/hooks';

const LycaPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetLyca } = useResetLyca();

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
              <DatePickerOptions setMutate={resetLyca} />
              <PageOptions />
            </Flex>
          </Flex>
          <LycaByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default LycaPages;
