import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchNiagaraOneDayKingKongByPage, useResetNiagaraOneDayKingKong } from '@/apis';
import { NiagaraOneDayKingKongByPage } from '@/containers';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const NiagaraOneDayKingKongPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetNiagaraOneDayKingKong } = useResetNiagaraOneDayKingKong();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.NiagaraOneDayKingKong));
  const { mutate: refetchNiagaraOneDayKingKong, isLoading } = useRefetchNiagaraOneDayKingKongByPage(queryKeyParams);

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Flex direction={'column'} gap={'4'} h={'100%'}>
          <Flex justifyContent={'space-between'} gap={'4'} wrap={'wrap'}>
            <Divider orientation="horizontal" />
            <Search
              onSubmit={(search) => {
                push({ pathname: router.pathname, query: { ...router.query, search } });
              }}
            />
            <Flex gap={'4'}>
              <RefetchButton isLoading={isLoading} setMutate={refetchNiagaraOneDayKingKong} />
              <DatePickerOptions setMutate={resetNiagaraOneDayKingKong} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <NiagaraOneDayKingKongByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraOneDayKingKongPages;
