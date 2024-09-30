import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { MusicalsByPage } from '@/containers';
import { useRefetchMusicalsByPage, useResetMusicals } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';

const MusicalsPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMusicals } = useResetMusicals();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Musicals));
  const { mutate: refetchMusicals, isLoading } = useRefetchMusicalsByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchMusicals} />
              <DatePickerOptions setMutate={resetMusicals} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <MusicalsByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MusicalsPages;
