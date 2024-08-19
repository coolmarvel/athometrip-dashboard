import { Flex } from '@chakra-ui/react';

import { Sidebar } from '../common';
import { HorizontalLayoutHeader } from './HorizontalLayoutHeader';

interface HorizontalLayoutProps {
  children?: React.ReactNode;
}

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
  return (
    <Flex direction="column" minH="100vh">
      <Flex>
        <Sidebar />
        <Flex as={'main'} flex={1} direction="column" p={2} gap={4} overflowY="auto">
          <HorizontalLayoutHeader />
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HorizontalLayout;
