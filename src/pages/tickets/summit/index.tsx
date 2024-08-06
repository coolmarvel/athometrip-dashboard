import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { SummitByPage } from '@/containers';
import { useResetSummit } from '@/apis';
import { useSafePush } from '@/hooks';

const SummitPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetSummit } = useResetSummit();

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
              <DatePickerOptions setMutate={resetSummit} />
              <PageOptions />
            </Flex>
          </Flex>
          <SummitByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default SummitPages;
