/**
 * 유저 관리 페이지
 *
 * @author 김이안
 */

import { GaiaHead, PageOptions, ResponsiveLayout, Search } from '../../../components';
import { Flex } from '@chakra-ui/react';
import { useSafePush } from '../../../hooks';
import UserPageContainer from '@/containers/system/user-management/UserPageContainer';
import { UsersUtils } from '@/containers';

const UserManagementPage = () => {
  const { router, push } = useSafePush();

  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Flex direction={'column'} gap={'4'} h={'100%'}>
          <UsersUtils />
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
              <PageOptions />
            </Flex>
          </Flex>
          <UserPageContainer />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default UserManagementPage;
