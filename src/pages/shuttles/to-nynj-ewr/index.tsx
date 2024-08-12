import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchToNYNJEWRByPage, useResetToNYNJEWR } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ToNYNJEWRByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const ToNYNJEWRPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToNYNJEWR } = useResetToNYNJEWR();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.ToNYNJEWR));
  const { mutate: refetchToNYNJEWR, isLoading } = useRefetchToNYNJEWRByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchToNYNJEWR} />
              <DatePickerOptions setMutate={resetToNYNJEWR} />
              <PageOptions />
            </Flex>
          </Flex>
          <ToNYNJEWRByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNJEWRPages;
