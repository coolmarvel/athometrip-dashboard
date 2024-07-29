/**
 * 권한 관리 페이지 컨테이너
 *
 * @author 김이안
 */
import { useRouter } from 'next/router';
import { usePagination } from '@/hooks';
import { TableContainer, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Pagination } from '@/components';
import { MenuSettingsContainer, RoleSettingsContainer, AuthoritySettingsContainer, ResourceSettingsContainer } from '@/containers/system/authority-management';
import { useState } from 'react';

const TabMenu = [
  '메뉴 설정',
  '역할 설정',
  '권한 설정',
  '자원 설정',
];

const AuthorityPageContainer = () => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0); // 각 탭 컴포넌트가 선택될 때만 로딩
  const { page, limit, sort, order, after, before, onPagination } = usePagination();
  const TabMenuItems = TabMenu.map((menu, index) => {
    return <Tab key={index}>{menu}</Tab>;
  });

  return (
    <>
      <Tabs variant="enclosed" onChange={(index) => setTabIndex(index)}>
        <TabList>
          {TabMenuItems}
        </TabList>
        <TabPanels>
          <TabPanel>
            {tabIndex === 0 && <MenuSettingsContainer />}
          </TabPanel>
          <TabPanel>
            {tabIndex === 1 && <RoleSettingsContainer />}
          </TabPanel>
          <TabPanel>
            {tabIndex === 2 && <AuthoritySettingsContainer />}
          </TabPanel>
          <TabPanel>
            {tabIndex === 3 && <ResourceSettingsContainer />}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <TableContainer flex={1} overflowY={'auto'}>
        {/*<UserTableContainer users={usersAll} isLoading={usersIsLoading} />*/}
      </TableContainer>
      {/*<Pagination currentPage={page} limit={limit} total={usersAll?.total ?? 0} onChange={(page) => onPagination({ page })} />*/}
    </>
  );
};

export default AuthorityPageContainer;
