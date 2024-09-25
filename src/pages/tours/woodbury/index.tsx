import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchWoodburyByPage, useResetWoodbury } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { WoodburyByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const WoodburyPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetWoodbury } = useResetWoodbury();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Woodbury));
  const { mutate: refetchWoodbury, isLoading } = useRefetchWoodburyByPage(queryKeyParams);

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Flex direction={'column'} gap={'4'} h={'100%'}>
          <Flex justifyContent={'space-between'} gap={'4'} wrap={'wrap'}>
            <Divider orientation="horizontal" />
            <Search
              onSubmit={(search) => {
                push({ pathname: router.pathname, query: { ...router.query, search } });
              }}
            />
            <Flex gap={'4'}>
              <RefetchButton isLoading={isLoading} setMutate={refetchWoodbury} />
              <DatePickerOptions setMutate={resetWoodbury} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <WoodburyByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WoodburyPages;
