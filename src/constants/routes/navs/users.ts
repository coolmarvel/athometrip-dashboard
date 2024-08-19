import { FaUser } from 'react-icons/fa';
import { match } from 'path-to-regexp';

import { defaultQuery } from '../queires';
import { PageRoutes } from '../routes';
import { Nav } from './nav-interface';

export const usersNav: Nav = {
  label: 'Users',
  pathname: PageRoutes.Users,
  query: defaultQuery,
  icon: FaUser,
  matcher: match(PageRoutes.Users),
  children: [{ label: 'User Detail', pathname: PageRoutes.UserDetail, matcher: match(PageRoutes.UserDetail) }],
};
