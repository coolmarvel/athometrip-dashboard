import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import NavbarTab from './NavbarTab';
import { findNavInHierarchy, Nav } from '@/constants';

interface NavbarProps {
  navs: Nav[];
}

const Navbar = ({ navs }: NavbarProps) => {
  const router = useRouter();
  const hierarchy = useMemo(() => findNavInHierarchy(router.pathname), [router.pathname]);

  return (
    <>
      {navs.map((nav, i) => (
        <NavbarTab key={nav.label} nav={nav} isActivated={hierarchy.includes(nav)} />
      ))}
    </>
  );
};

export default Navbar;
