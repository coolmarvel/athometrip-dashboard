import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchEmpireByPage, useResetEmpire } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { EmpireByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const EmpirePages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetEmpire } = useResetEmpire();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Empire));
  const { mutate: refetchEmpire, isLoading } = useRefetchEmpireByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchEmpire} />
              <DatePickerOptions setMutate={resetEmpire} />
              <PageOptions />
            </Flex>
          </Flex>
          <EmpireByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default EmpirePages;
