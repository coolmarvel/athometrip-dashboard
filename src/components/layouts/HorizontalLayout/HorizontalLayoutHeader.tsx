import { Box, Flex, useColorMode } from '@chakra-ui/react';
import { ColorToggle, LanguageToggle } from '@/components/layouts/common/Sidebar';

export const HorizontalLayoutHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={colorMode === 'light' ? '#ffffff' : '#191F2B'}
      width="full"
      px={3}
      py={2}
    >
      <Flex justify="space-between" align="center">
        <Box>
        </Box>
        <Flex align="center" gap="2">
          <ColorToggle colorMode={colorMode} toggleColorMode={toggleColorMode} />
          <LanguageToggle />
        </Flex>
      </Flex>
    </Box>
  );
};