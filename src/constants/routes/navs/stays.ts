import { match } from 'path-to-regexp';
import { PiHouseLineBold } from 'react-icons/pi';
import { RxTransparencyGrid } from 'react-icons/rx';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const staysNav: Nav = {
  label: 'Stays',
  pathname: PageRoutes.Stays,
  query: normalQuery,
  icon: PiHouseLineBold,
  matcher: match(PageRoutes.Stays),
  collapsible: false,
  children: [{ label: 'Stays Detail', icon: RxTransparencyGrid, pathname: PageRoutes.StaysDetail, matcher: match(PageRoutes.StaysDetail) }],
};