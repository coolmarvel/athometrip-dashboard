import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchCityTripByPage, useResetCityTrip } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { CityTripByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const CityTripPage = () => {
  const { router, push } = useSafePush();
  const { mutate: resetCityTrip } = useResetCityTrip();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.CityTrip));
  const { mutate: refetchCityTrip, isLoading } = useRefetchCityTripByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchCityTrip} />
              <DatePickerOptions setMutate={resetCityTrip} />
              <PageOptions />
            </Flex>
          </Flex>
          <CityTripByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default CityTripPage;
