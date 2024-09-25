import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchNiagaraOneDayAthometripByPage, useResetNiagaraOneDayAthometrip } from '@/apis';
import { NiagaraOneDayAthometripByPage } from '@/containers';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const NiagaraOneDayAthometripPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetNiagaraOneDayAthometrip } = useResetNiagaraOneDayAthometrip();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.NiagaraOneDayAthometrip));
  const { mutate: refetchNiagaraOneDayAthometrip, isLoading } = useRefetchNiagaraOneDayAthometripByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchNiagaraOneDayAthometrip} />
              <DatePickerOptions setMutate={resetNiagaraOneDayAthometrip} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <NiagaraOneDayAthometripByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraOneDayAthometripPages;
