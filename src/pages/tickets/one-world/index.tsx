import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchOneWorldByPage, useResetOneWorld } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { OneWorldByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const OneWorldPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetOneWorld } = useResetOneWorld();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.OneWorld));
  const { mutate: refetchOneWorld, isLoading } = useRefetchOneWorldByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchOneWorld} />
              <DatePickerOptions setMutate={resetOneWorld} />
              <PageOptions />
            </Flex>
          </Flex>
          <OneWorldByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default OneWorldPages;
