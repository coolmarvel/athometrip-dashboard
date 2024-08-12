import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchWhitneyDocentByPage, useResetWhitneyDocent } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { WhitneyDocentByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const WhitneyDocentPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetWhitneyDocent } = useResetWhitneyDocent();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.WhitneyDocent));
  const { mutate: refetchWhitneyDocent, isLoading } = useRefetchWhitneyDocentByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchWhitneyDocent} />
              <DatePickerOptions setMutate={resetWhitneyDocent} />
              <PageOptions />
            </Flex>
          </Flex>
          <WhitneyDocentByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WhitneyDocentPages;
