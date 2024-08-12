import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchUNTourByPage, useResetUNTour } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { UNTourByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const UNTourPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetUNTour } = useResetUNTour();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.UNTour));
  const { mutate: refetchUNTour, isLoading } = useRefetchUNTourByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchUNTour} />
              <DatePickerOptions setMutate={resetUNTour} />
              <PageOptions />
            </Flex>
          </Flex>
          <UNTourByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default UNTourPages;
