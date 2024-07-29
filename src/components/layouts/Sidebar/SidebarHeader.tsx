import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Box, Center, Flex, IconButton, Tooltip } from '@chakra-ui/react';

import { toUrl } from '@/utils';
import { Logo } from '@/components';
import { useSafePush } from '@/hooks';
import { PageRoutes } from '@/constants';
import { ColorToggle, LanguageToggle } from '@/components/layouts/Sidebar/Toggle';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
  colorMode: 'light' | 'dark',
  toggleColorMode: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, rtl, colorMode, toggleColorMode, ...rest }) => {
  const { push } = useSafePush();

  return (
    <Center as={'header'} flexDirection={'column'} gap={'4'} py={'4'}>
      <Box display={{ base: 'block', lg: 'none', xl: 'block' }}>
        <Logo onClick={() => push(toUrl(PageRoutes.Home))} />
      </Box>
      <Box display={{ base: 'none', lg: 'block', xl: 'none' }}>
        <Tooltip hasArrow label={'Home'}>
          <IconButton aria-label={'home'} icon={<AiOutlineHome />} onClick={() => push(toUrl(PageRoutes.Home))} />
        </Tooltip>
      </Box>
      <Flex gap={'2'} direction={{ base: 'row', lg: 'column', xl: 'row' }}>
        <ColorToggle colorMode={colorMode} toggleColorMode={toggleColorMode} />
        <LanguageToggle />
      </Flex>
    </Center>
  );
};
