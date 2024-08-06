
import { GaiaHead, PageOptions, ResponsiveLayout, Search } from '@/components';
import { Flex } from '@chakra-ui/react';
import AuthorityPageContainer from '@/containers/system/authority-management/AuthorityPageContainer';

/**
 * 권한 관리 페이지
 *
 * @constructor
 * @author 김이안
 */
const AuthorityManagementPage = () => {
  return (
    <>
      <GaiaHead />
      <ResponsiveLayout>
        <Flex direction={'column'} gap={'4'} h={'100%'}>
          <Flex justifyContent={'space-between'} gap={'4'} wrap={'wrap'}>
            {/*<Search*/}
            {/*  onSubmit={(search) =>*/}
            {/*    push({*/}
            {/*      pathname: router.pathname,*/}
            {/*      query: { ...router.query, search },*/}
            {/*    })*/}
            {/*  }*/}
            {/*/>*/}
          </Flex>
          <AuthorityPageContainer />
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default AuthorityManagementPage;
