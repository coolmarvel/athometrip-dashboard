import { Divider, Flex } from '@chakra-ui/react';

import { DatePickerOptions, GaiaHead, PageOptions, RefetchButton, ResponsiveLayout, Search } from '@/components';
import { useRefetchToJFKByPage, useResetToJFK } from '@/apis';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { ToJFKByPage } from '@/containers';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const ToJFKPages = () => {
  const { router, push } = useSafePush();
  const { mutate: resetToJFK } = useResetToJFK();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.ToJFK));
  const { mutate: refetchToJFK, isLoading } = useRefetchToJFKByPage(queryKeyParams);

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
              <RefetchButton isLoading={isLoading} setMutate={refetchToJFK} />
              <DatePickerOptions setMutate={resetToJFK} />
              <PageOptions />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
          <ToJFKByPage />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ToJFKPages;
