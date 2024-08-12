import { match } from 'path-to-regexp';
import { BsFill1SquareFill, BsFill2SquareFill, BsFill3SquareFill, BsFillCollectionFill } from 'react-icons/bs';

import { Nav } from './nav-interface';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const shuttlesNav: Nav = {
  label: 'Shuttles',
  icon: BsFillCollectionFill,
  pathname: PageRoutes.Shuttles,
  matcher: match(PageRoutes.Shuttles),
  collapsible: true,
  children: [
    {
      label: 'To JFK',
      pathname: PageRoutes.ToJFK,
      matcher: match(PageRoutes.ToJFK),
      icon: BsFill1SquareFill,
      query: normalQuery,
      children: [{ label: 'To JFK Detail', pathname: PageRoutes.ToJFKDetail, matcher: match(PageRoutes.ToJFKDetail), query: normalQuery }],
    },
    {
      label: 'To NY/NJ',
      pathname: PageRoutes.ToNYNJ,
      matcher: match(PageRoutes.ToNYNJ),
      icon: BsFill2SquareFill,
      query: normalQuery,
      children: [{ label: 'To NY/NJ Detail', pathname: PageRoutes.ToNYNJDetail, matcher: match(PageRoutes.ToNYNJDetail), query: normalQuery }],
    },
    {
      label: 'To EWR',
      pathname: PageRoutes.ToEWR,
      matcher: match(PageRoutes.ToEWR),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'To EWR Detail', pathname: PageRoutes.ToEWRDetail, matcher: match(PageRoutes.ToEWRDetail), query: normalQuery }],
    },
    {
      label: 'To NY/NJ/EWR',
      pathname: PageRoutes.ToNYNJEWR,
      matcher: match(PageRoutes.ToNYNJEWR),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'To NY/NJ/EWR Detail', pathname: PageRoutes.ToNYNJEWRDetail, matcher: match(PageRoutes.ToNYNJEWRDetail), query: normalQuery }],
    },
    {
      label: 'To JFK(Night)',
      pathname: PageRoutes.ToJFKNight,
      matcher: match(PageRoutes.ToJFKNight),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'To JFK(Night) Detail', pathname: PageRoutes.ToJFKNightDetail, matcher: match(PageRoutes.ToJFKNightDetail), query: normalQuery }],
    },
    {
      label: 'To NY/NJ(Night)',
      pathname: PageRoutes.ToNYNight,
      matcher: match(PageRoutes.ToNYNight),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'To NY/NJ(Night) Detail', pathname: PageRoutes.ToNYNightDetail, matcher: match(PageRoutes.ToNYNightDetail), query: normalQuery }],
    },
  ],
};