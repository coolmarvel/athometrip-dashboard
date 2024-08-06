import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { GuggenheimDocentByPage } from '@/containers';
import { useResetGuggenheimDocent } from '@/apis';
import { useSafePush } from '@/hooks';

const GuggenheimDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetGuggenheimDocent } = useResetGuggenheimDocent();

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
              <DatePickerOptions setMutate={resetGuggenheimDocent} />
              <PageOptions />
            </Flex>
          </Flex>
          <GuggenheimDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default GuggenheimDocentPages;
