import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchNiagaraTwoDaysByPage, useResetNiagaraTwoDays } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { NiagaraTwoDaysByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const NiagaraTwoDaysPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetNiagaraTwoDays } = useResetNiagaraTwoDays();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.NiagaraTwoDays));
  const { mutate: refetchNiagaraTwoDays, isLoading } = useRefetchNiagaraTwoDaysByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchNiagaraTwoDays} />
              <DatePickerOptions setMutate={resetNiagaraTwoDays} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <NiagaraTwoDaysByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default NiagaraTwoDaysPages;
