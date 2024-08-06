import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { AMNHDocentByPage } from '@/containers';
import { useResetAMNHDocent } from '@/apis';
import { useSafePush } from '@/hooks';

const AMNHDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetAMNHDocent } = useResetAMNHDocent();

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
              <DatePickerOptions setMutate={resetAMNHDocent} />
              <PageOptions />
            </Flex>
          </Flex>
          <AMNHDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default AMNHDocentPages;
