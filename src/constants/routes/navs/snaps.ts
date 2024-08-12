import { match } from 'path-to-regexp';
import { BsFill1SquareFill, BsFill2SquareFill, BsFillCollectionFill } from 'react-icons/bs';

import { Nav } from './nav-interface';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const snapsNav: Nav = {
  label: 'Snaps',
  icon: BsFillCollectionFill,
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
      children: [{ label: 'Modern Detail', pathname: PageRoutes.ModernDetail, matcher: match(PageRoutes.ModernDetail), query: normalQuery }],
    },
    {
      label: 'Vintage',
      pathname: PageRoutes.Vintage,
      matcher: match(PageRoutes.Vintage),
      icon: BsFill2SquareFill,
      query: normalQuery,
      children: [{ label: 'Vintage Detail', pathname: PageRoutes.VintageDetail, matcher: match(PageRoutes.VintageDetail), query: normalQuery }],
    },
  ],
};