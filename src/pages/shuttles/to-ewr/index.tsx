import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchToEWRByPage, useResetToEWR } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ToEWRByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const ToEWRPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToEWR } = useResetToEWR();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.ToEWR));
  const { mutate: refetchToEWR, isLoading } = useRefetchToEWRByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchToEWR} />
              <DatePickerOptions setMutate={resetToEWR} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <ToEWRByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToEWRPages;
