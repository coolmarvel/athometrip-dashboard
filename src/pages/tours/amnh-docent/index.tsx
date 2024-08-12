import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchAMNHDocentByPage, useResetAMNHDocent } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { AMNHDocentByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const AMNHDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetAMNHDocent } = useResetAMNHDocent();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.AMNHDocent));
  const { mutate: refetchAMNHDocent, isLoading } = useRefetchAMNHDocentByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchAMNHDocent} />
              <DatePickerOptions setMutate={resetAMNHDocent} />
              <PageOptions />
            </Flex>
          </Flex>
          <AMNHDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default AMNHDocentPages;
