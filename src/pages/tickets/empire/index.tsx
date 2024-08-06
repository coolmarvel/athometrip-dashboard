import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { EmpireByPage } from '@/containers';
import { useResetEmpire } from '@/apis';
import { useSafePush } from '@/hooks';

const EmpirePages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetEmpire } = useResetEmpire();

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
              <DatePickerOptions setMutate={resetEmpire} />
              <PageOptions />
            </Flex>
          </Flex>
          <EmpireByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default EmpirePages;
