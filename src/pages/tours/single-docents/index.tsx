import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { SingleDocentsByPage } from '@/containers';
import { useResetSingleDocents } from '@/apis';
import { useSafePush } from '@/hooks';

const SingleDocentsPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetSingleDocents } = useResetSingleDocents();

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
              <DatePickerOptions setMutate={resetSingleDocents} />
              <PageOptions />
            </Flex>
          </Flex>
          <SingleDocentsByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default SingleDocentsPages;
