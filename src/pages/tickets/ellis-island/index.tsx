import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { EllisIslandByPage } from '@/containers';
import { useRefetchEllisIslandByPage, useResetEllisIsland } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';

const EllisIslandPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetEllisIsland } = useResetEllisIsland();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.EllisIsland));
  const { mutate: refetchEllisIsland, isLoading } = useRefetchEllisIslandByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchEllisIsland} />
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
