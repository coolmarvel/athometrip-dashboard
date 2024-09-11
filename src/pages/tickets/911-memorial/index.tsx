import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetch911MemorialByPage, useReset911Memorial } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { Memorial911ByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const Memorial911Pages = () => {
  const { router, push } = useSafePush();
  const { mutate: reset911Memorial } = useReset911Memorial();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Memorial911));
  const { mutate: refetchMemorial911, isLoading } = useRefetch911MemorialByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchMemorial911} />
              <DatePickerOptions setMutate={reset911Memorial} />
              <PageOptions />
            </Flex>
          </Flex>
          <Memorial911ByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default Memorial911Pages;
