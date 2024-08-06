import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { CityTripByPage } from '@/containers';
import { useResetCityTrip } from '@/apis';
import { useSafePush } from '@/hooks';

const CityTripPage = () => {
  const { router, push } = useSafePush();
  const { mutate: resetCityTrip } = useResetCityTrip();

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
