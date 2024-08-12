import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchVintageByPage, useResetVintage } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { VintageByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const VintagePages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetVintage } = useResetVintage();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Vintage));
  const { mutate: refetchVintage, isLoading } = useRefetchVintageByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchVintage} />
              <DatePickerOptions setMutate={resetVintage} />
              <PageOptions />
            </Flex>
          </Flex>
          <VintageByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default VintagePages;
