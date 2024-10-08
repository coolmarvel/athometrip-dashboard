import { match } from 'path-to-regexp';

import { PageRoutes } from './routes';
import { Nav, usimsNav, staysNav, toursNav, snapsNav, ticketsNav, systemsNav, musicalsNav, shuttlesNav, toursSuburbsNav } from './navs';

export const whiteList = [PageRoutes.Signin];

export const isExistPage = (pathname: string) => {
  return Object.values(PageRoutes).some((route) => match(route)(pathname));
};

export const isWhiteList = (pathname: string) => {
  return whiteList.some((route) => match(route)(pathname));
};

export const navs: Nav[] = [ticketsNav, usimsNav, toursNav, toursSuburbsNav, shuttlesNav, snapsNav, staysNav, musicalsNav, systemsNav];

export const findNavInHierarchy = (pathname: string, items = navs, parents: Nav[] = []): Nav[] => {
  for (const nav of items) {
    const matched = !!nav.matcher(pathname);
    if (matched) return [...parents, nav];

    if (nav.children) {
      const navs = findNavInHierarchy(pathname, nav.children, [...parents, nav]);
      if (navs.length) return navs;
    }
  }

  return [];
};

export * from './navs';
export * from './routes';
export * from './queires';
