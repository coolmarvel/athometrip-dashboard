import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { EllisIslandByPage } from '@/containers';
import { useResetEllisIsland } from '@/apis';
import { useSafePush } from '@/hooks';

const EllisIslandPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetEllisIsland } = useResetEllisIsland();

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
              <DatePickerOptions setMutate={resetEllisIsland} />
              <PageOptions />
            </Flex>
          </Flex>
          <EllisIslandByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default EllisIslandPages;
