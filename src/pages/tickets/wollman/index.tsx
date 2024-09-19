import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchWollmanByPage, useResetWollman } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { WollmanByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const WollmanPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetWollman } = useResetWollman();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Wollman));
  const { mutate: refetchWollman, isLoading } = useRefetchWollmanByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchWollman} />
              <DatePickerOptions setMutate={resetWollman} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <WollmanByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WollmanPages;
