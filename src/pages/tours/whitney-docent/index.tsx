import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { WhitneyDocentByPage } from '@/containers';
import { useResetWhitneyDocent } from '@/apis';
import { useSafePush } from '@/hooks';

const WhitneyDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetWhitneyDocent } = useResetWhitneyDocent();

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
              <DatePickerOptions setMutate={resetWhitneyDocent} />
              <PageOptions />
            </Flex>
          </Flex>
          <WhitneyDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WhitneyDocentPages;
