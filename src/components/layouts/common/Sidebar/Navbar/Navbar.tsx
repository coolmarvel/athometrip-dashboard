import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import NavbarTab from './NavbarTab';
import { findNavInHierarchy, navs } from '@/constants';

const Navbar = () => {
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
