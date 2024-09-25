import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, PageOptions, ResponsiveLayout, Search, ModeOptions, RegionOptions, GaiaHead, RefetchButton } from '@/components';
import { useRefetchTMobileByPage, useResetTMobile } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { TMobileByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const TMobilePages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetTMobile } = useResetTMobile();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.TMobile));
  const { mutate: refetchTMobile, isLoading } = useRefetchTMobileByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchTMobile} />
              <DatePickerOptions setMutate={resetTMobile} />
              <RegionOptions />
              <ModeOptions />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <TMobileByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default TMobilePages;
