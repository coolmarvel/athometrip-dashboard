import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { H2OEsimByPage } from '@/containers';
import { useResetH2OEsim } from '@/apis';
import { useSafePush } from '@/hooks';

const H2OEsimPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetH2OEsim } = useResetH2OEsim();

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
              <DatePickerOptions setMutate={resetH2OEsim} />
              <PageOptions />
            </Flex>
          </Flex>
          <H2OEsimByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default H2OEsimPages;
