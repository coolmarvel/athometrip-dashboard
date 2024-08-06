import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { LandmarkByPage } from '@/containers';
import { useResetLandmark } from '@/apis';
import { useSafePush } from '@/hooks';

const LandmarkPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetLandmark } = useResetLandmark();

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
