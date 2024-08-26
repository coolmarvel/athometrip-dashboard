import {
  BsFill0SquareFill,
  BsFill1SquareFill,
  BsFill2SquareFill,
  BsFill3SquareFill,
  BsFill4SquareFill,
  BsFill5SquareFill,
  BsFill6SquareFill,
  BsFill7SquareFill,
  BsFill8SquareFill,
  BsFill9SquareFill,
} from 'react-icons/bs';
import { match } from 'path-to-regexp';
import { HiOutlineTicket } from 'react-icons/hi';
import { RxTransparencyGrid } from 'react-icons/rx';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const ticketsNav: Nav = {
  label: 'Tickets',
  icon: HiOutlineTicket,
  pathname: PageRoutes.Tickets,
  matcher: match(PageRoutes.Tickets),
  collapsible: true,
  children: [
    {
      label: 'Top of the Rock',
      pathname: PageRoutes.TopOfTheRock,
      matcher: match(PageRoutes.TopOfTheRock),
      icon: BsFill0SquareFill,
      query: normalQuery,
      children: [{ label: 'Top of the Rock Detail', icon: RxTransparencyGrid, pathname: PageRoutes.TopOfTheRockDetail, matcher: match(PageRoutes.TopOfTheRockDetail) }],
    },
    {
      label: 'Summit',
      pathname: PageRoutes.Summit,
      matcher: match(PageRoutes.Summit),
      icon: BsFill1SquareFill,
      query: normalQuery,
      children: [{ label: 'Summit Detail', icon: RxTransparencyGrid, pathname: PageRoutes.SummitDetail, matcher: match(PageRoutes.SummitDetail) }],
    },
    {
      label: 'Empire',
      pathname: PageRoutes.Empire,
      matcher: match(PageRoutes.Empire),
      icon: BsFill2SquareFill,
      query: normalQuery,
      children: [{ label: 'Empire Detail', icon: RxTransparencyGrid, pathname: PageRoutes.EmpireDetail, matcher: match(PageRoutes.EmpireDetail) }],
    },
    {
      label: 'OneWorld',
      pathname: PageRoutes.OneWorld,
      matcher: match(PageRoutes.OneWorld),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'OneWorld Detail', icon: RxTransparencyGrid, pathname: PageRoutes.OneWorldDetail, matcher: match(PageRoutes.OneWorldDetail) }],
    },
    {
      label: 'Memorial911',
      pathname: PageRoutes.Memorial911,
      matcher: match(PageRoutes.Memorial911),
      icon: BsFill4SquareFill,
      query: normalQuery,
      children: [{ label: 'Memorial911 Detail', icon: RxTransparencyGrid, pathname: PageRoutes.Memorial911Detail, matcher: match(PageRoutes.Memorial911Detail) }],
    },
    {
      label: 'UNTour',
      pathname: PageRoutes.UNTour,
      matcher: match(PageRoutes.UNTour),
      icon: BsFill5SquareFill,
      query: normalQuery,
      children: [{ label: 'UNTour Detail', icon: RxTransparencyGrid, pathname: PageRoutes.UNTourDetail, matcher: match(PageRoutes.UNTourDetail) }],
    },
    {
      label: 'Wollman',
      pathname: PageRoutes.Wollman,
      matcher: match(PageRoutes.Wollman),
      icon: BsFill6SquareFill,
      query: normalQuery,
      children: [{ label: 'Wollman Detail', icon: RxTransparencyGrid, pathname: PageRoutes.WollmanDetail, matcher: match(PageRoutes.WollmanDetail) }],
    },
    {
      label: 'CityTrip',
      pathname: PageRoutes.CityTrip,
      matcher: match(PageRoutes.CityTrip),
      icon: BsFill7SquareFill,
      query: normalQuery,
      children: [{ label: 'CityTrip Detail', icon: RxTransparencyGrid, pathname: PageRoutes.CityTripDetail, matcher: match(PageRoutes.CityTripDetail) }],
    },
    {
      label: 'EllisIsland',
      pathname: PageRoutes.EllisIsland,
      matcher: match(PageRoutes.EllisIsland),
      icon: BsFill8SquareFill,
      query: normalQuery,
      children: [{ label: 'EllisIsland Detail', icon: RxTransparencyGrid, pathname: PageRoutes.EllisIslandDetail, matcher: match(PageRoutes.EllisIslandDetail) }],
    },
    {
      label: 'MLBMets',
      pathname: PageRoutes.MLBMets,
      matcher: match(PageRoutes.MLBMets),
      icon: BsFill9SquareFill,
      query: normalQuery,
      children: [{ label: 'MLBMets Detail', icon: RxTransparencyGrid, pathname: PageRoutes.MLBMetsDetail, matcher: match(PageRoutes.MLBMetsDetail) }],
    },
  ],
};