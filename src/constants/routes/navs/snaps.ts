import { match } from 'path-to-regexp';
import { FaCameraRetro } from 'react-icons/fa';
import { RxTransparencyGrid } from 'react-icons/rx';
import { BsFill1SquareFill, BsFill2SquareFill } from 'react-icons/bs';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const snapsNav: Nav = {
  label: 'Snaps',
  icon: FaCameraRetro,
  pathname: PageRoutes.Snaps,
  matcher: match(PageRoutes.Snaps),
  collapsible: true,
  children: [
    {
      label: 'Modern',
      pathname: PageRoutes.Modern,
      matcher: match(PageRoutes.Modern),
      icon: BsFill1SquareFill,
      query: normalQuery,
      children: [{ label: 'Modern Detail', icon: RxTransparencyGrid, pathname: PageRoutes.ModernDetail, matcher: match(PageRoutes.ModernDetail), query: normalQuery }],
    },
    {
      label: 'Vintage',
      pathname: PageRoutes.Vintage,
      matcher: match(PageRoutes.Vintage),
      icon: BsFill2SquareFill,
      query: normalQuery,
      children: [{ label: 'Vintage Detail', icon: RxTransparencyGrid, pathname: PageRoutes.VintageDetail, matcher: match(PageRoutes.VintageDetail), query: normalQuery }],
    },
  ],
};