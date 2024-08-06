import { GaiaHead, PageOptions, ResponsiveLayout, Search, ViewOptions } from '@/components';
import { ViewQueries } from '@/constants';
import { PostUtils, PostsByCursor, PostsByPage } from '@/containers';
import { useSafePush } from '@/hooks';
import { Flex } from '@chakra-ui/react';

import { useMemo } from 'react';

const PostsAllPage = () => {
  const { router, push } = useSafePush();
  const viewOption = router.query?.view as ViewQueries;

  const display = useMemo(() => {
    switch (viewOption) {
      case ViewQueries.Table:
        return <PostsByPage />;
      case ViewQueries.List:
        return <PostsByCursor usesObserver />;
      default:
        return null;
    }
  }, [viewOption]);

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Flex direction={'column'} gap={'4'} h={'100%'}>
          <PostUtils />
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

export default PostsAllPage;
