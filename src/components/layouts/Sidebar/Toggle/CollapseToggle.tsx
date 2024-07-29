import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

interface CollapseToggleProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const CollapseToggle: React.FC<CollapseToggleProps> = ({ collapsed, setCollapsed }) => {
  return (
    <IconButton
      aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      icon={collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      onClick={() => setCollapsed(!collapsed)}
      position="absolute"
      top="100px"
      right={collapsed ? '-17px' : '-17px'}
      zIndex="overlay"
    />
  );
};

export default CollapseToggle;
