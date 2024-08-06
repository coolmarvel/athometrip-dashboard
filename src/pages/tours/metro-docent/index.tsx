import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { MetroDocentByPage } from '@/containers';
import { useResetMetroDocent } from '@/apis';
import { useSafePush } from '@/hooks';

const MetroDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMetroDocent } = useResetMetroDocent();

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
              <DatePickerOptions setMutate={resetMetroDocent} />
              <PageOptions />
            </Flex>
          </Flex>
          <MetroDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MetroDocentPages;
