import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchSummitByPage, useResetSummit } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { SummitByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const SummitPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetSummit } = useResetSummit();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Summit));
  const { mutate: refetchSummit, isLoading } = useRefetchSummitByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchSummit} />
              <DatePickerOptions setMutate={resetSummit} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <SummitByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default SummitPages;
