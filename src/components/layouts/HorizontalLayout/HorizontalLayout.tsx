import { Flex, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Sidebar, SubHeader } from '../common';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface HorizontalLayoutProps {
  children?: React.ReactNode;
}

const HorizontalLayout = ({ children }: HorizontalLayoutProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const iconButtonBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex>
      <Sidebar isOpen={isOpen} />
      <Flex flex={1} direction={'column'} p={'8'} gap={'4'} maxH={'100vh'} overflow={'hidden'}>
        <Flex justify="start" align="center">
          {/* Toggle Button */}
          <IconButton icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />} onClick={onToggle} aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'} size={'sm'} bgColor={iconButtonBg} mr={2} />
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
