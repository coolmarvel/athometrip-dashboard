import { match } from 'path-to-regexp';
import { FaUser } from 'react-icons/fa';
import { RxTransparencyGrid } from 'react-icons/rx';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { defaultQuery } from '../queires';

export const usersNav: Nav = {
  label: 'Users',
  pathname: PageRoutes.Users,
  query: defaultQuery,
  icon: FaUser,
  matcher: match(PageRoutes.Users),
  collapsible: false,
  children: [{ label: 'User Detail', icon: RxTransparencyGrid, pathname: PageRoutes.UserDetail, matcher: match(PageRoutes.UserDetail) }],
};
