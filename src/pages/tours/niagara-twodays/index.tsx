import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { NiagaraTwoDaysByPage } from '@/containers';
import { useResetNiagaraTwoDays } from '@/apis';
import { useSafePush } from '@/hooks';

const NiagaraTwoDaysPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetNiagaraTwoDays } = useResetNiagaraTwoDays();

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
              <DatePickerOptions setMutate={resetNiagaraTwoDays} />
              <PageOptions />
            </Flex>
          </Flex>
          <NiagaraTwoDaysByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraTwoDaysPages;
