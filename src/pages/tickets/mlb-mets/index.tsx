import { Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchMLBMetsByPage, useResetMLBMets } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { MLBMetsByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const MLBMetsPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetMLBMets } = useResetMLBMets();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.MLBMets));
  const { mutate: refetchMLBMets, isLoading } = useRefetchMLBMetsByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchMLBMets} />
              <DatePickerOptions setMutate={resetMLBMets} />
              <PageOptions />
            </Flex>
          </Flex>
          <MLBMetsByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default MLBMetsPages;
