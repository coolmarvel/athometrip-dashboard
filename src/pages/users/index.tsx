import { useMemo } from 'react';
import { Flex } from '@chakra-ui/react';

import { GaiaHead, PageOptions, ResponsiveLayout, Search, ViewOptions } from '@/components';
import { UserUtils, UsersByCursor, UsersByPage } from '@/containers';
import { ViewQueries } from '@/constants';
import { useSafePush } from '@/hooks';

const UsersPage = () => {
  const { router, push } = useSafePush();
  const viewOption = router.query?.view as ViewQueries;

  const display = useMemo(() => {
    switch (viewOption) {
      case ViewQueries.Table:
        return <UsersByPage />;
      case ViewQueries.List:
        return <UsersByCursor usesObserver />;
      default:
        return null;
    }
  }, [viewOption]);

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Flex direction={'column'} gap={'4'} h={'100%'}>
          <UserUtils />
          <Flex justifyContent={'space-between'} gap={'4'} wrap={'wrap'}>
            <Search
              onSubmit={(search) =>
                push({
                  pathname: router.pathname,
                  query: { ...router.query, search },
                })
              }
            />
            <Flex gap={'4'}>
              <ViewOptions />
              <PageOptions />
            </Flex>
          </Flex>
          {display}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default UsersPage;
