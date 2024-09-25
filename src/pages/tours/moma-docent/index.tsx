import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchMomaDocentByPage, useResetMomaDocent } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { MomaDocentByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const MomaDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMomaDocent } = useResetMomaDocent();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.MomaDocent));
  const { mutate: refetchMomaDocent, isLoading } = useRefetchMomaDocentByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchMomaDocent} />
              <DatePickerOptions setMutate={resetMomaDocent} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <MomaDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MomaDocentPages;
