import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchStaysByPage, useResetStays } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { StaysByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const StaysPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetStays } = useResetStays();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Stays));
  const { mutate: refetchStays, isLoading } = useRefetchStaysByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchStays} />
              <DatePickerOptions setMutate={resetStays} />
              <PageOptions />
            </Flex>
          </Flex>
          <StaysByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default StaysPages;
