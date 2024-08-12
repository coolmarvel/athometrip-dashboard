import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchMetroDocentByPage, useResetMetroDocent } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { MetroDocentByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const MetroDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMetroDocent } = useResetMetroDocent();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.MetroDocent));
  const { mutate: refetchMetroDocent, isLoading } = useRefetchMetroDocentByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchMetroDocent} />
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
