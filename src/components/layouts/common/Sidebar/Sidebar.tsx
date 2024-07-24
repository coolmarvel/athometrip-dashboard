import React, { useState } from 'react';
import { Box, Divider, IconButton, useDisclosure } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import SidebarHeader from '@/components/layouts/common/Sidebar/SidebarHeader';
import Navbar from '@/components/layouts/common/Sidebar/Navbar/Navbar';
import SidebarFooter from '@/components/layouts/common/Sidebar/SidebarFooter';
import { useAlphaColor } from '@/hooks';

const Sidebar = () => {
  const alphaColor = useAlphaColor();
  const { isOpen, onToggle } = useDisclosure({ isOpen: true });

  return (
    <Box position="relative" flexShrink={0}>
      <Box as={'aside'} display={isOpen ? 'flex' : 'none'} flexDirection={'column'} bgColor={alphaColor(50)} w={{ base: '64', lg: '24', xl: '64' }} p={'4'} h={'100vh'}>
        <SidebarHeader />
        <Divider />
        <Box overflowY="auto" flex="1">
          <Navbar />
        </Box>
        <SidebarFooter />
      </Box>

      {/*<IconButton*/}
      {/*  aria-label={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}*/}
      {/*  icon={isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
      {/*  onClick={onToggle}*/}
      {/*  position="absolute"*/}
      {/*  top="400px"*/}
      {/*  right={isOpen ? 'calc(-20px)' : '-20px'}*/}
      {/*  zIndex="overlay"*/}
      {/*/>*/}
    </Box>
  );
};

export default Sidebar;