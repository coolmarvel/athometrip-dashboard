import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { MetroDocentPaintingByPage } from '@/containers';
import { useResetMetroDocentPainting } from '@/apis';
import { useSafePush } from '@/hooks';

const MetroDocentPaintingPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMetroDocentPainting } = useResetMetroDocentPainting();

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
              <DatePickerOptions setMutate={resetMetroDocentPainting} />
              <PageOptions />
            </Flex>
          </Flex>
          <MetroDocentPaintingByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MetroDocentPaintingPages;
