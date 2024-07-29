// NavbarTab.tsx
import React from 'react';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

import { Nav } from '@/constants';
import { useSafePush } from '@/hooks';
import { BarChart } from '@/components/layouts/Sidebar/icons/BarChart';

interface NavbarTabProps {
  nav: Nav;
  isActivated: boolean;
}

const NavbarTab = ({ nav, isActivated }: NavbarTabProps) => {
  const { push } = useSafePush();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!nav.collapsible) push({ pathname: nav.pathname, query: nav.query });
  };

  return (
    <>
      {nav.children && nav.children?.length > 0 ? (
        nav.children.length === 1 ? (
          <MenuItem icon={<BarChart />} onClick={handleClick}>{nav.label}</MenuItem>
        ) : (
          <SubMenu label={nav.label} icon={<BarChart />} onClick={handleClick}>
            {nav.children.map((child, i) => (
              <NavbarTab key={child.label} nav={child} isActivated={isActivated} />
            ))}
          </SubMenu>
        )
      ) : null}
    </>
  );
};

export default NavbarTab;
