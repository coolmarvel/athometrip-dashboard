import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { MusicalsByPage } from '@/containers';
import { useResetMusicals } from '@/apis';
import { useSafePush } from '@/hooks';

const MusicalsPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMusicals } = useResetMusicals();

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
              <DatePickerOptions setMutate={resetMusicals} />
              <PageOptions />
            </Flex>
          </Flex>
          <MusicalsByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MusicalsPages;
