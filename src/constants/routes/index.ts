import { match } from 'path-to-regexp';

import { Nav, navs } from './navs';
import { PageRoutes } from './routes';

export const whiteList = [PageRoutes.Home, PageRoutes.Signin, PageRoutes.Users, PageRoutes.UserDetail];

export const isExistPage = (pathname: string) => {
  return Object.values(PageRoutes).some((route) => match(route)(pathname));
};

export const isWhiteList = (pathname: string) => {
  return whiteList.some((route) => match(route)(pathname));
};

export const findNavInHierarchy = (pathname: string, items = navs, parents: Nav[] = []): Nav[] => {
  for (const nav of items) {
    const matched = !!nav.matcher(pathname);
    if (matched) return [...parents, nav];

    if (nav.children) {
      const navs = findNavInHierarchy(pathname, nav.children, [...parents, nav]);
      if (navs.length) return navs;
    } else {
      continue;
    }
  }
  return [];
};

export * from './navs';
export * from './routes';
export * from './queires';
