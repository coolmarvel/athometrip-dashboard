import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchSingleDocentsByPage, useResetSingleDocents } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { SingleDocentsByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const SingleDocentsPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetSingleDocents } = useResetSingleDocents();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.SingleDocents));
  const { mutate: refetchSingleDocents, isLoading } = useRefetchSingleDocentsByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchSingleDocents} />
              <DatePickerOptions setMutate={resetSingleDocents} />
              <PageOptions />
            </Flex>
          </Flex>
          <SingleDocentsByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default SingleDocentsPages;
