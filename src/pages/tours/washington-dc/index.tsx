import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchWashingtonDCByPage, useResetWashingtonDC } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { WashingtonDCByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const WashingtonDCPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetWashingtonDC } = useResetWashingtonDC();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.WashingtonDC));
  const { mutate: refetchWashingtonDC, isLoading } = useRefetchWashingtonDCByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchWashingtonDC} />
              <DatePickerOptions setMutate={resetWashingtonDC} />
              <PageOptions />
            </Flex>
          </Flex>
          <WashingtonDCByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WashingtonDCPages;
