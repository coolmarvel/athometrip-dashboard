import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, PageOptions, ResponsiveLayout, Search, ModeOptions, RegionOptions, GaiaHead } from '@/components';
import { TMobileByPage } from '@/containers';
import { useResetTMobile } from '@/apis';
import { useSafePush } from '@/hooks';

const TMobilePages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetTMobile } = useResetTMobile();

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
              <DatePickerOptions setMutate={resetTMobile} />
              <RegionOptions />
              <ModeOptions />
              <PageOptions />
            </Flex>
          </Flex>
          <TMobileByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default TMobilePages;
