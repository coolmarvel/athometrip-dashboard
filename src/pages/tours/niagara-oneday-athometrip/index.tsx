import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { NiagaraOneDayAthometripByPage } from '@/containers';
import { useResetNiagaraOneDayAthometrip } from '@/apis';
import { useSafePush } from '@/hooks';

const NiagaraOneDayAthometripPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetNiagaraOneDayAthometrip } = useResetNiagaraOneDayAthometrip();

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
              <DatePickerOptions setMutate={resetNiagaraOneDayAthometrip} />
              <PageOptions />
            </Flex>
          </Flex>
          <NiagaraOneDayAthometripByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraOneDayAthometripPages;
