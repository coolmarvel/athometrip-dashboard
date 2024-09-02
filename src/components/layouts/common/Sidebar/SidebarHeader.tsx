import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Box, Center, IconButton, Tooltip, Flex } from '@chakra-ui/react';

import { toUrl } from '@/utils';
import { Logo } from '@/components';
import { useSafePush } from '@/hooks';
import { PageRoutes } from '@/constants';

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
  collapsed: boolean;
  colorMode: 'light' | 'dark';
  toggleColorMode: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, rtl, collapsed, colorMode, toggleColorMode, ...rest }) => {
  const { push } = useSafePush();

  return (
    <Center as={'header'} flexDirection={'column'} gap={'4'} py={'4'} height={'64px'} minHeight={'64px'} display={'flex'} alignItems={'center'} padding={'0px 20px'} overflow={'hidden'}>
      <Box display={{ base: 'block', lg: 'none', xl: 'block' }}>
        <Flex align="center" w="full" justify={collapsed ? 'center' : 'start'}>
          <Logo onClick={() => push(toUrl(PageRoutes.Home))} />
        </Flex>
      </Box>
      <Box display={{ base: 'none', lg: 'block', xl: 'none' }}>
        <Tooltip hasArrow label={'Home'}>
          <IconButton aria-label={'home'} icon={<AiOutlineHome />} onClick={() => push(toUrl(PageRoutes.Home))} />
        </Tooltip>
      </Box>
    </Center>
  );
};
