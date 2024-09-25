import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchMetroDocentPaintingByPage, useResetMetroDocentPainting } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { MetroDocentPaintingByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const MetroDocentPaintingPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMetroDocentPainting } = useResetMetroDocentPainting();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.MetroDocentPainting));
  const { mutate: refetchMetroDocentPainting, isLoading } = useRefetchMetroDocentPaintingByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchMetroDocentPainting} />
              <DatePickerOptions setMutate={resetMetroDocentPainting} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <MetroDocentPaintingByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MetroDocentPaintingPages;
