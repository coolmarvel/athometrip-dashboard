import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchToNYNightByPage, useResetToNYNight } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ToNYNightByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const ToNYNightPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToNYNight } = useResetToNYNight();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.ToNYNight));
  const { mutate: refetchToNYNight, isLoading } = useRefetchToNYNightByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchToNYNight} />
              <DatePickerOptions setMutate={resetToNYNight} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <ToNYNightByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNightPages;
