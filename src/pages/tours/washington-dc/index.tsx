import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { WashingtonDCByPage } from '@/containers';
import { useResetWashingtonDC } from '@/apis';
import { useSafePush } from '@/hooks';

const WashingtonDCPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetWashingtonDC } = useResetWashingtonDC();

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
              <DatePickerOptions setMutate={resetWashingtonDC} />
              <PageOptions />
            </Flex>
          </Flex>
          <WashingtonDCByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WashingtonDCPages;
