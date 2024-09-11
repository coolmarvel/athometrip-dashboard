import { match } from 'path-to-regexp';
import { FaShuttleVan } from 'react-icons/fa';
import { RxTransparencyGrid } from 'react-icons/rx';
import { BsFill1SquareFill, BsFill2SquareFill, BsFill3SquareFill, BsFill4SquareFill, BsFill5SquareFill, BsFill6SquareFill } from 'react-icons/bs';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const shuttlesNav: Nav = {
  label: 'Shuttles',
  icon: FaShuttleVan,
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
      children: [{ label: 'To JFK Detail', icon: RxTransparencyGrid, pathname: PageRoutes.ToJFKDetail, matcher: match(PageRoutes.ToJFKDetail), query: normalQuery }],
    },
    {
      label: 'To NY/NJ',
      pathname: PageRoutes.ToNYNJ,
      matcher: match(PageRoutes.ToNYNJ),
      icon: BsFill2SquareFill,
      query: normalQuery,
      children: [{ label: 'To NY/NJ Detail', icon: RxTransparencyGrid, pathname: PageRoutes.ToNYNJDetail, matcher: match(PageRoutes.ToNYNJDetail), query: normalQuery }],
    },
    {
      label: 'To EWR',
      pathname: PageRoutes.ToEWR,
      matcher: match(PageRoutes.ToEWR),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'To EWR Detail', icon: RxTransparencyGrid, pathname: PageRoutes.ToEWRDetail, matcher: match(PageRoutes.ToEWRDetail), query: normalQuery }],
    },
    {
      label: 'To NY/NJ/EWR',
      pathname: PageRoutes.ToNYNJEWR,
      matcher: match(PageRoutes.ToNYNJEWR),
      icon: BsFill4SquareFill,
      query: normalQuery,
      children: [{ label: 'To NY/NJ/EWR Detail', icon: RxTransparencyGrid, pathname: PageRoutes.ToNYNJEWRDetail, matcher: match(PageRoutes.ToNYNJEWRDetail), query: normalQuery }],
    },
    {
      label: 'To JFK(Night)',
      pathname: PageRoutes.ToJFKNight,
      matcher: match(PageRoutes.ToJFKNight),
      icon: BsFill5SquareFill,
      query: normalQuery,
      children: [{ label: 'To JFK(Night) Detail', icon: RxTransparencyGrid, pathname: PageRoutes.ToJFKNightDetail, matcher: match(PageRoutes.ToJFKNightDetail), query: normalQuery }],
    },
    {
      label: 'To NY/NJ(Night)',
      pathname: PageRoutes.ToNYNight,
      matcher: match(PageRoutes.ToNYNight),
      icon: BsFill6SquareFill,
      query: normalQuery,
      children: [{ label: 'To NY/NJ(Night) Detail', icon: RxTransparencyGrid, pathname: PageRoutes.ToNYNightDetail, matcher: match(PageRoutes.ToNYNightDetail), query: normalQuery }],
    },
  ],
};