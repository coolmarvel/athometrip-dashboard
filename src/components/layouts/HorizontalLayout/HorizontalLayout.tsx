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
        <Flex zIndex={2}>
          <Sidebar />
        </Flex>
        <Flex as={'main'} flex={1} direction="column" p={2} gap={4} overflowY="auto" zIndex={1}>
          <HorizontalLayoutHeader />
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HorizontalLayout;
