import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchLandmarkByPage, useResetLandmark } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { LandmarkByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const LandmarkPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetLandmark } = useResetLandmark();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Landmark));
  const { mutate: refetchLandmark, isLoading } = useRefetchLandmarkByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchLandmark} />
              <DatePickerOptions setMutate={resetLandmark} />
              <PageOptions />
            </Flex>
          </Flex>
          <LandmarkByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default LandmarkPages;
