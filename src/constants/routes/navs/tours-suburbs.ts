import { match } from 'path-to-regexp';
import { MdTour } from 'react-icons/md';
import { RxTransparencyGrid } from 'react-icons/rx';
import { BsFill1SquareFill, BsFill2SquareFill, BsFill3SquareFill } from 'react-icons/bs';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const toursSuburbsNav: Nav = {
  label: 'Tours(Suburbs)',
  icon: MdTour,
  pathname: PageRoutes.Tours,
  matcher: match(PageRoutes.Tours),
  collapsible: true,
  children: [
    {
      label: 'WashingtonDC',
      pathname: PageRoutes.WashingtonDC,
      matcher: match(PageRoutes.WashingtonDC),
      icon: BsFill1SquareFill,
      query: normalQuery,
      children: [{ label: 'WashingtonDC Detail', icon: RxTransparencyGrid, pathname: PageRoutes.WashingtonDCDetail, matcher: match(PageRoutes.WashingtonDCDetail), query: normalQuery }],
    },
    {
      label: 'Boston',
      pathname: PageRoutes.Boston,
      matcher: match(PageRoutes.Boston),
      icon: BsFill2SquareFill,
      query: normalQuery,
      children: [{ label: 'Boston Detail', icon: RxTransparencyGrid, pathname: PageRoutes.BostonDetail, matcher: match(PageRoutes.BostonDetail), query: normalQuery }],
    },
    {
      label: 'Niagara(TwoDays)',
      pathname: PageRoutes.NiagaraTwoDays,
      matcher: match(PageRoutes.NiagaraTwoDays),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'Niagara(TwoDays) Detail', icon: RxTransparencyGrid, pathname: PageRoutes.NiagaraTwoDaysDetail, matcher: match(PageRoutes.NiagaraTwoDaysDetail), query: normalQuery }],
    },
    {
      label: 'Niagara(Athometrip)',
      pathname: PageRoutes.NiagaraOneDayAthometrip,
      matcher: match(PageRoutes.NiagaraOneDayAthometrip),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{
        label: 'Niagara(Athometrip) Detail',
        icon: RxTransparencyGrid,
        pathname: PageRoutes.NiagaraOneDayAthometripDetail,
        matcher: match(PageRoutes.NiagaraOneDayAthometripDetail),
        query: normalQuery,
      }],
    },
    {
      label: 'Niagara(KingKong)',
      pathname: PageRoutes.NiagaraOneDayKingKong,
      matcher: match(PageRoutes.NiagaraOneDayKingKong),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{
        label: 'Niagara(KingKong) Detail',
        icon: RxTransparencyGrid,
        pathname: PageRoutes.NiagaraOneDayKingKongDetail,
        matcher: match(PageRoutes.NiagaraOneDayKingKongDetail),
        query: normalQuery,
      }],
    },
  ],
};