import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { StaysByPage } from '@/containers';
import { useResetStays } from '@/apis';
import { useSafePush } from '@/hooks';

const StaysPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetStays } = useResetStays();

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
              <DatePickerOptions setMutate={resetStays} />
              <PageOptions />
            </Flex>
          </Flex>
          <StaysByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default StaysPages;
