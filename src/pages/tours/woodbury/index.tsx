import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { WoodburyByPage } from '@/containers';
import { useResetWoodbury } from '@/apis';
import { useSafePush } from '@/hooks';

const WoodburyPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetWoodbury } = useResetWoodbury();

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
              <DatePickerOptions setMutate={resetWoodbury} />
              <PageOptions />
            </Flex>
          </Flex>
          <WoodburyByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WoodburyPages;
