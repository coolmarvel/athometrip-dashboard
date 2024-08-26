import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

import { Nav } from '@/constants';
import { useSafePush } from '@/hooks';

interface NavbarTabProps {
  nav: Nav;
  isActivated: boolean;
}

const NavbarTab = ({ nav, isActivated }: NavbarTabProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!nav.collapsible) push({ pathname: nav.pathname, query: nav.query });
  };

  return (
    <>
      {nav.children && nav.children?.length > 0 ? (
        nav.collapsible === true ? (
          <SubMenu label={t(nav.label)} icon={<nav.icon size={18} />}>
            {nav.children.map((child, i) => (
              <NavbarTab key={child.label} nav={child} isActivated={isActivated} />
            ))}
          </SubMenu>
        ) : (
          <MenuItem icon={<nav.icon size={18} />} onClick={handleClick}>
            {t(nav.label)}
          </MenuItem>
        )
      ) : null}
    </>
  );
};

export default NavbarTab;
