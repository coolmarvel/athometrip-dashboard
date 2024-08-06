import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { VintageByPage } from '@/containers';
import { useResetVintage } from '@/apis';
import { useSafePush } from '@/hooks';

const VintagePages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetVintage } = useResetVintage();

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
              <DatePickerOptions setMutate={resetVintage} />
              <PageOptions />
            </Flex>
          </Flex>
          <VintageByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default VintagePages;
