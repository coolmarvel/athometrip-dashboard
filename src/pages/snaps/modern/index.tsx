import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchModernByPage, useResetModern } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ModernByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const ModernPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetModern } = useResetModern();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Modern));
  const { mutate: refetchModern, isLoading } = useRefetchModernByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchModern} />
              <DatePickerOptions setMutate={resetModern} />
              <PageOptions />
            </Flex>
          </Flex>
          <ModernByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ModernPages;
