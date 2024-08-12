import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { LycaByPage } from '@/containers';
import { useRefetchLycaByPage, useResetLyca } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';

const LycaPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetLyca } = useResetLyca();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Lyca));
  const { mutate: refetchLyca, isLoading } = useRefetchLycaByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchLyca} />
              <DatePickerOptions setMutate={resetLyca} />
              <PageOptions />
            </Flex>
          </Flex>
          <LycaByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default LycaPages;
