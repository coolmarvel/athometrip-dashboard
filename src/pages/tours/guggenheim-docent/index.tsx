import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchGuggenheimDocentByPage, useResetGuggenheimDocent } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { GuggenheimDocentByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const GuggenheimDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetGuggenheimDocent } = useResetGuggenheimDocent();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.GuggenheimDocent));
  const { mutate: refetchGuggenheimDocent, isLoading } = useRefetchGuggenheimDocentByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchGuggenheimDocent} />
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
