import { Flex } from '@chakra-ui/react';

import { Sidebar, SubHeader } from '../common';

interface HorizontalLayoutProps {
  children?: React.ReactNode;
}

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
  return (
    <Flex>
      <Sidebar />
      <Flex flex={1} direction={'column'} p={'8'} gap={'4'} maxH={'100vh'} overflow={'hidden'}>
        <Flex justify="start" align="center">
          <SubHeader />
        </Flex>
        <Flex as={'main'} flex={1} direction={'column'} overflowY={'auto'} p={'0.5'}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HorizontalLayout;
