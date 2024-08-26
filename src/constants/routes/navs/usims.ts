import { match } from 'path-to-regexp';
import { FaSimCard } from 'react-icons/fa';
import { RxTransparencyGrid } from 'react-icons/rx';
import { BsFill1SquareFill, BsFill2SquareFill, BsFill3SquareFill } from 'react-icons/bs';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { usimQuery, normalQuery } from '../queires';

export const usimsNav: Nav = {
  label: 'Usims',
  icon: FaSimCard,
  pathname: PageRoutes.Usims,
  matcher: match(PageRoutes.Usims),
  collapsible: true,
  children: [
    {
      label: 'T-Mobile',
      pathname: PageRoutes.TMobile,
      matcher: match(PageRoutes.TMobile),
      icon: BsFill1SquareFill,
      query: usimQuery,
      children: [{ label: 'T-Mobile Detail', icon: RxTransparencyGrid, pathname: PageRoutes.TMobileDetail, matcher: match(PageRoutes.TMobileDetail), query: usimQuery }],
    },
    {
      label: 'H2O(Esim)',
      pathname: PageRoutes.H2OEsim,
      matcher: match(PageRoutes.H2OEsim),
      icon: BsFill2SquareFill,
      query: normalQuery,
      children: [{ label: 'H2O(Esim) Detail', icon: RxTransparencyGrid, pathname: PageRoutes.H2OEsimDetail, matcher: match(PageRoutes.H2OEsimDetail), query: normalQuery }],
    },
    {
      label: 'Lyca',
      pathname: PageRoutes.Lyca,
      matcher: match(PageRoutes.Lyca),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'Lyca Portal', icon: RxTransparencyGrid, pathname: PageRoutes.LycaDetail, matcher: match(PageRoutes.LycaDetail), query: normalQuery }],
    },
  ],
};