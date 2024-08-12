import { match } from 'path-to-regexp';
import { BsFill1SquareFill, BsFill2SquareFill, BsFill3SquareFill, BsFill4SquareFill, BsFill7SquareFill, BsFillCollectionFill } from 'react-icons/bs';

import { Nav } from './nav-interface';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const toursNav: Nav = {
  label: 'Tours',
  icon: BsFillCollectionFill,
  pathname: PageRoutes.Tours,
  matcher: match(PageRoutes.Tours),
  collapsible: true,
  children: [
    {
      label: 'Landmark',
      pathname: PageRoutes.Landmark,
      matcher: match(PageRoutes.Landmark),
      icon: BsFill1SquareFill,
      query: normalQuery,
      children: [{ label: 'Landmark Detail', pathname: PageRoutes.LandmarkDetail, matcher: match(PageRoutes.LandmarkDetail), query: normalQuery }],
    },
    {
      label: 'Woodbury',
      pathname: PageRoutes.Woodbury,
      matcher: match(PageRoutes.Woodbury),
      icon: BsFill2SquareFill,
      query: normalQuery,
      children: [{ label: 'Woodbury Detail', pathname: PageRoutes.WoodburyDetail, matcher: match(PageRoutes.WoodburyDetail), query: normalQuery }],
    },
    {
      label: 'MetroDocent',
      pathname: PageRoutes.MetroDocent,
      matcher: match(PageRoutes.MetroDocent),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'MetroDocent Detail', pathname: PageRoutes.MetroDocentDetail, matcher: match(PageRoutes.MetroDocentDetail), query: normalQuery }],
    },
    {
      label: 'MetroDocent(Painting)',
      pathname: PageRoutes.MetroDocentPainting,
      matcher: match(PageRoutes.MetroDocentPainting),
      icon: BsFill3SquareFill,
      query: normalQuery,
      children: [{ label: 'MetroDocentPainting Detail', pathname: PageRoutes.MetroDocentPaintingDetail, matcher: match(PageRoutes.MetroDocentPaintingDetail), query: normalQuery }],
    },
    {
      label: 'MomaDocent',
      pathname: PageRoutes.MomaDocent,
      matcher: match(PageRoutes.MomaDocent),
      icon: BsFill4SquareFill,
      query: normalQuery,
      children: [{ label: 'MomaDocent Detail', pathname: PageRoutes.MomaDocentDetail, matcher: match(PageRoutes.MomaDocentDetail), query: normalQuery }],
    },
    // {
    //   label: 'GuggenheimDocent',
    //   pathname: PageRoutes.GuggenheimDocent,
    //   matcher: match(PageRoutes.GuggenheimDocent),
    //   icon: BsFill5SquareFill,
    //   query: normalQuery,
    //   children: [{ label: 'GuggenheimDocent Detail', pathname: PageRoutes.GuggenheimDocentDetail, matcher: match(PageRoutes.GuggenheimDocentDetail), query: normalQuery }],
    // },
    // {
    //   label: 'WhitneyDocent',
    //   pathname: PageRoutes.WhitneyDocent,
    //   matcher: match(PageRoutes.WhitneyDocent),
    //   icon: BsFill6SquareFill,
    //   query: normalQuery,
    //   children: [{ label: 'WhitneyDocent Detail', pathname: PageRoutes.WhitneyDocentDetail, matcher: match(PageRoutes.WhitneyDocentDetail), query: normalQuery }],
    // },
    {
      label: 'SingleDocents',
      pathname: PageRoutes.SingleDocents,
      matcher: match(PageRoutes.SingleDocents),
      icon: BsFill7SquareFill,
      query: normalQuery,
      children: [{ label: 'SingleDocents Detail', pathname: PageRoutes.SingleDocentsDetail, matcher: match(PageRoutes.SingleDocentsDetail), query: normalQuery }],
    },
    {
      label: 'AMNHDocent',
      pathname: PageRoutes.AMNHDocent,
      matcher: match(PageRoutes.AMNHDocent),
      icon: BsFill7SquareFill,
      query: normalQuery,
      children: [{ label: 'AMNHDocent Detail', pathname: PageRoutes.AMNHDocentDetail, matcher: match(PageRoutes.AMNHDocentDetail), query: normalQuery }],
    },
  ],
};