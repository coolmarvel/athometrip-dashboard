import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search, RefetchButton } from '@/components';
import { useRefetchTopOfTheRockByPage, useResetTopOfTheRock } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { TopOfTheRockByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const TopOfTheRockPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetTopOfTheRock } = useResetTopOfTheRock();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.TopOfTheRock));
  const { mutate: refetchTopOfTheRock, isLoading } = useRefetchTopOfTheRockByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchTopOfTheRock} />
              <DatePickerOptions setMutate={resetTopOfTheRock} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <TopOfTheRockByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default TopOfTheRockPages;
