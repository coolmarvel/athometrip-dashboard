import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchToNYNJByPage, useResetToNYNJ } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ToNYNJByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const ToNYNJPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToNYNJ } = useResetToNYNJ();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.ToNYNJ));
  const { mutate: refetchToNYNJ, isLoading } = useRefetchToNYNJByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchToNYNJ} />
              <DatePickerOptions setMutate={resetToNYNJ} />
              <PageOptions />
            </Flex>
          </Flex>
          <ToNYNJByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToNYNJPages;
