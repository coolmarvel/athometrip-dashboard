import { match } from 'path-to-regexp';
import { BsFillCollectionFill } from 'react-icons/bs';

import { Nav } from './nav-interface';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const staysNav: Nav = {
  label: 'Stays',
  pathname: PageRoutes.Stays,
  query: normalQuery,
  icon: BsFillCollectionFill,
  matcher: match(PageRoutes.Stays),
  children: [
    {
      label: 'Stays Detail',
      pathname: PageRoutes.StaysDetail,
      matcher: match(PageRoutes.StaysDetail),
    },
  ],
};