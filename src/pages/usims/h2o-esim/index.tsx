import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchH2OEsimByPage, useResetH2OEsim } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { H2OEsimByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const H2OEsimPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetH2OEsim } = useResetH2OEsim();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.H2OEsim));
  const { mutate: refetchH2OEsim, isLoading } = useRefetchH2OEsimByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchH2OEsim} />
              <DatePickerOptions setMutate={resetH2OEsim} />
              <PageOptions />
            </Flex>
          </Flex>
          <H2OEsimByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default H2OEsimPages;
