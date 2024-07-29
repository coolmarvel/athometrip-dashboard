import { findNavInHierarchy, navs } from '@/constants';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import NavbarTab from './NavbarTab';

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
