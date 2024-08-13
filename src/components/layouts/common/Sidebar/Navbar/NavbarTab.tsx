import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

import { Nav } from '@/constants';
import { useSafePush } from '@/hooks';
import { BarChart } from '../icons/BarChart';

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
        nav.children.length === 1 ? (
          <MenuItem icon={<BarChart />} onClick={handleClick}>
            {t(`${nav.label}`)}
          </MenuItem>
        ) : (
          <SubMenu label={t(`${nav.label}`)} icon={<BarChart />} onClick={handleClick}>
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
