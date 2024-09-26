import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchToJFKNightByPage, useResetToJFKNight } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ToJFKNightByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const ToJFKNightPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToJFKNight } = useResetToJFKNight();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.ToJFKNight));
  const { mutate: refetchToJFKNight, isLoading } = useRefetchToJFKNightByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchToJFKNight} />
              <DatePickerOptions setMutate={resetToJFKNight} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <ToJFKNightByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToJFKNightPages;
