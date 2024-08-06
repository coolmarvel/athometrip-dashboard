import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { MLBMetsByPage } from '@/containers';
import { useResetMLBMets } from '@/apis';
import { useSafePush } from '@/hooks';

const MLBMetsPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMLBMets } = useResetMLBMets();

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
              <DatePickerOptions setMutate={resetMLBMets} />
              <PageOptions />
            </Flex>
          </Flex>
          <MLBMetsByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MLBMetsPages;
