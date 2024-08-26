import React, { useCallback } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

interface CollapseToggleProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const CollapseToggle: React.FC<CollapseToggleProps> = ({ collapsed, setCollapsed }) => {
  const handleCollapse = useCallback(() => {
    setCollapsed(!collapsed);
    localStorage.setItem('collapsed', collapsed.toString());
  }, [collapsed, setCollapsed]);

  return (
    <IconButton
      aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      icon={collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      onClick={() => handleCollapse()}
      position="absolute"
      top="10"
      right="-4"
      zIndex="overlay"
      fontSize="2xl"
      border="4px"
      borderColor="currentColor"
      borderRadius="full"
    />
  );
};

export default CollapseToggle;
