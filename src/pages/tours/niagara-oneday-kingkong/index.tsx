import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { NiagaraOneDayKingKongByPage } from '@/containers';
import { useResetNiagaraOneDayKingKong } from '@/apis';
import { useSafePush } from '@/hooks';

const NiagaraOneDayKingKongPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetNiagaraOneDayKingKong } = useResetNiagaraOneDayKingKong();

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
              <DatePickerOptions setMutate={resetNiagaraOneDayKingKong} />
              <PageOptions />
            </Flex>
          </Flex>
          <NiagaraOneDayKingKongByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraOneDayKingKongPages;
