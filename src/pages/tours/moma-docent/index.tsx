import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { MomaDocentByPage } from '@/containers';
import { useResetMomaDocent } from '@/apis';
import { useSafePush } from '@/hooks';

const MomaDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMomaDocent } = useResetMomaDocent();

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
              <DatePickerOptions setMutate={resetMomaDocent} />
              <PageOptions />
            </Flex>
          </Flex>
          <MomaDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MomaDocentPages;
