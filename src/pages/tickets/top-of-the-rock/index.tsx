import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { TopOfTheRockByPage } from '@/containers';
import { useResetTopOfTheRock } from '@/apis';
import { useSafePush } from '@/hooks';

const TopOfTheRockPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetTopOfTheRock } = useResetTopOfTheRock();

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
              <DatePickerOptions setMutate={resetTopOfTheRock} />
              <PageOptions />
            </Flex>
          </Flex>
          <TopOfTheRockByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default TopOfTheRockPages;
