import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, useColorMode } from '@chakra-ui/react';
import { Sidebar as SideBar, Menu, menuClasses, MenuItemStyles } from 'react-pro-sidebar';

import { SidebarHeader } from './SidebarHeader';
// import { SidebarFooter } from './SidebarFooter';
import { Typography } from './components/Typography';
import { Navbar, CollapseToggle } from '@/components/layouts/common/Sidebar';
import { musicalsNav, Nav, postsNav, shuttlesNav, snapsNav, staysNav, systemsNav, ticketsNav, toursNav, toursSuburbsNav, usersNav, usimsNav } from '@/constants';

type Theme = 'light' | 'dark';

const themes = {
  light: {
    sidebar: { backgroundColor: '#ffffff', color: '#607489' },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: { backgroundColor: '#c5e4ff', color: '#44596e' },
      disabled: { color: '#9fb6cf' },
    },
  },
  dark: {
    sidebar: { backgroundColor: '#191F2B', color: '#8ba1b7' },
    menu: {
      menuContent: '#191F2B',
      icon: '#59d0ff',
      hover: { backgroundColor: '#191F2B', color: '#b6c8d9' },
      disabled: { color: '#3e5e7e' },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();

  const [rtl, setRtl] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>(localStorage.getItem('chakra-ui-color-mode') as Theme);
  const [collapsed, setCollapsed] = React.useState(!!localStorage.getItem('collapsed'));

  const generalNavs: Nav[] = [ticketsNav, usimsNav, toursNav, toursSuburbsNav, shuttlesNav, snapsNav, staysNav, musicalsNav];
  const extraNavs: Nav[] = [systemsNav];
  const testNavs: Nav[] = [postsNav, usersNav];

  useEffect(() => {
    setTheme(colorMode);
  }, [colorMode, toggleColorMode]);

  const menuItemStyles: MenuItemStyles = {
    root: { fontSize: '11px', fontWeight: 300 },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
    },
    SubMenuExpandIcon: { color: '#b6b7b9' },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1) : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({ fontWeight: open ? 600 : undefined }),
  };

  return (
    <Box position="relative" flexShrink={0}>
      <div style={{ display: 'flex', height: '100%', direction: rtl ? 'rtl' : 'ltr' }}>
        <SideBar
          collapsed={collapsed}
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          onBreakPoint={setBroken}
          rtl={rtl}
          breakPoint="md"
          backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
          rootStyles={{ color: themes[theme].sidebar.color }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <SidebarHeader rtl={rtl} collapsed={collapsed} colorMode={colorMode} toggleColorMode={toggleColorMode} style={{ marginBottom: '24px', marginTop: '16px' }} />

            <div style={{ flex: 1, marginBottom: '32px' }}>
              <div style={{ padding: '0 24px', marginBottom: '8px' }}>
                <Typography variant="body2" fontWeight={600} style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}>
                  {t('General')}
                </Typography>
              </div>

              <Menu menuItemStyles={menuItemStyles}>
                <Navbar navs={generalNavs} />
              </Menu>

              <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                <Typography variant="body2" fontWeight={600} style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}>
                  {t('Extra')}
                </Typography>
              </div>

              <Menu menuItemStyles={menuItemStyles}>
                <Navbar navs={extraNavs} />
              </Menu>

              <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
                <Typography variant="body2" fontWeight={600} style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}>
                  {t('Test')}
                </Typography>
              </div>

              <Menu menuItemStyles={menuItemStyles}>
                <Navbar navs={testNavs} />
              </Menu>
            </div>

            {/*<SidebarFooter collapsed={collapsed} />*/}
          </div>
        </SideBar>

        <CollapseToggle collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </Box>
  );
};

export default Sidebar;
