import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchBostonByPage, useResetBoston } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { BostonByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const BostonPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetBoston } = useResetBoston();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Boston));
  const { mutate: refetchBoston, isLoading } = useRefetchBostonByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchBoston} />
              <DatePickerOptions setMutate={resetBoston} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <BostonByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default BostonPages;
