import { MatchFunction, match } from 'path-to-regexp';
import { IconType } from 'react-icons';
import {
  // BsFillPostcardFill,
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
  BsFillCollectionFill,
} from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

export enum ApiRoutes {
  Upload = 'api/upload',
  Signin = 'api/auth/signin',
  Signout = 'api/auth/signout',
  Me = 'api/auth/me',
  User = 'api/users/:id?',
  ApproveUser = 'api/users/:id?/approve',
  Post = 'api/posts/:id?',
  // LikedPost = 'api/posts/liked',

  // Tickets
  Empire = 'api/tickets/empire/:id?',
  Summit = 'api/tickets/summit/:id?',
  UNTour = 'api/tickets/un-tour/:id?',
  Wollman = 'api/tickets/wollman/:id?',
  MLBMets = 'api/tickets/mlb-mets/:id?',
  CityTrip = 'api/tickets/city-trip/:id?',
  OneWorld = 'api/tickets/one-world/:id?',
  EllisIsland = 'api/tickets/ellis-island/:id?',
  Memorial911 = 'api/tickets/911-memorial/:id?',
  TopOfTheRock = 'api/tickets/top-of-the-rock/:id?',

  // USIMs
  TMobile = 'api/usims/t-mobile/:id?',
  H2OEsim = 'api/usims/h2o-esim/:id?',
  Lyca = 'api/usims/lyca/:id?',

  // Tours
  Landmark = 'api/tours/landmark/:id?',
  Woodbury = 'api/tours/woodbury/:id?',
  MomaDocent = 'api/tours/moma-docent/:id?',
  AMNHDocent = 'api/tours/amnh-docent/:id?',
  MetroDocent = 'api/tours/metro-docent/:id?',
  MetroDocentPainting = 'api/tours/metro-docent-painting/:id?',
  WhitneyDocent = 'api/tours/whitney-docent/:id?',
  GuggenheimDocent = 'api/tours/guggenheim-docent/:id?',
  SingleDocents = 'api/tours/single-docents/:id?',

  // Tours(Suburbs)
  WashingtonDC = 'api/tours/washington-dc/:id?',
  Niagara = 'api/tours/niagara/:id?',
  Boston = 'api/tours/boston/:id?',
}

export enum PageRoutes {
  Home = '/',
  Signin = '/auth/signin',
  Users = '/users',
  UserDetail = '/users/:id',
  Posts = '/posts',
  PostDetail = '/posts/:id',
  WritePost = '/posts/write',
  EditPost = '/posts/:id/edit',

  // Tickets
  Tickets = '/tickets',
  TopOfTheRock = '/tickets/top-of-the-rock',
  TopOfTheRockDetail = '/tickets/top-of-the-rock/:id',
  Summit = '/tickets/summit',
  SummitDetail = 'tickets/summit/:id',
  Empire = '/tickets/empire',
  EmpireDetail = '/tickets/empire/:id',
  OneWorld = '/tickets/one-world',
  OneWorldDetail = '/tickets/one-world/:id',
  Memorial911 = '/tickets/911-memorial',
  Memorial911Detail = '/tickets/911-memorial/:id',
  UNTour = '/tickets/un-tour',
  UNTourDetail = '/tickets/un-tour/:id',
  Wollman = '/tickets/wollman',
  WollmanDetail = '/tickets/wollman/:id',
  CityTrip = '/tickets/city-trip',
  CityTripDetail = '/tickets/city-trip/:id',
  EllisIsland = '/tickets/ellis-island',
  EllisIslandDetail = '/tickets/ellis-island/:id',
  MLBMets = '/tickets/mlb-mets',
  MLBMetsDetail = '/tickets/mlb-mets/:id',

  // USIMs
  Usims = '/usims',
  TMobile = '/usims/t-mobile',
  TMobileDetail = '/usims/t-mobile/:id',
  H2OEsim = '/usims/h2o-esim',
  H2OEsimDetail = 'usims/h2o-esim/:id',
  Lyca = '/usims/lyca',
  LycaDetail = 'usims/lyca/:id',

  // Tours
  Tours = '/tours',
  Landmark = '/tours/landmark',
  LandmarkDetail = '/tours/landmark/:id',
  Woodbury = '/tours/woodbury',
  WoodburyDetail = '/tours/woodbury/:id',
  MetroDocent = '/tours/metro-docent',
  MetroDocentDetail = '/tours/metro-docent/:id',
  MetroDocentPainting = '/tours/metro-docent-painting',
  MetroDocentPaintingDetail = '/tours/metro-docent-painting/:id',
  MomaDocent = '/tours/moma-docent',
  MomaDocentDetail = '/tours/moma-docent/:id',
  GuggenheimDocent = '/tours/guggenheim-docent',
  GuggenheimDocentDetail = '/tours/guggenheim-docent/:id',
  WhitneyDocent = '/tours/whitney-docent',
  WhitneyDocentDetail = '/tours/whitney-docent/:id',
  AMNHDocent = '/tours/amnh-docent', // American Museum of Nature History
  AMNHDocentDetail = '/tours/amnh-docent/:id',
  SingleDocents = '/tours/single-docents',
  SingleDocentsDetail = '/tours/single-docents/:id',

  // Tours(Suburbs)
  WashingtonDC = '/tours/washington-dc',
  WashingtonDCDetail = '/tours/washington-dc/:id',
  Boston = '/tours/boston',
  BostonDetail = '/tours/boston/:id',
  Niagara = '/tours/niagara',
  NiagaraDetail = '/tours/niagara/:id',
}

export const whiteList = [PageRoutes.Home, PageRoutes.Signin, PageRoutes.Users, PageRoutes.UserDetail];

export const isExistPage = (pathname: string) => {
  return Object.values(PageRoutes).some((route) => match(route)(pathname));
};

export const isWhiteList = (pathname: string) => {
  return whiteList.some((route) => match(route)(pathname));
};

// t("Table")
// t("List")
export enum ViewQueries {
  Table = 'table',
  List = 'list',
}

export enum ModeQueries {
  Usim = 'usim',
  Esim = 'esim',
}

export enum RegionQueries {
  USA = 'usa',
  Other = 'mexico/canada',
}

export enum DayQueries {
  OneDay = 'one-day',
  TwoDay = 'two-day',
}

export interface Nav {
  label: string;
  pathname: PageRoutes;
  query?: Record<string, number | string>;
  icon?: IconType;
  matcher: MatchFunction;
  children?: Nav[];
  collapsible?: boolean;
}

export const defaultQuery = {
  view: ViewQueries.Table,
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  search: '',
};

export const ticketQuery = {
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  search: '',
};

export const usimQuery = {
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  mode: ModeQueries.Usim,
  region: RegionQueries.USA,
  search: '',
};

export const tourQuery = {
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  day: DayQueries.OneDay,
  search: '',
};

// t("Users")
// t("User Detail")
// t("Posts")
// t("Write Post")
// t("Post Detail")
export const navs: Nav[] = [
  // Users
  {
    label: 'Users',
    pathname: PageRoutes.Users,
    query: defaultQuery,
    icon: FaUser,
    matcher: match(PageRoutes.Users),
    children: [{ label: 'User Detail', pathname: PageRoutes.UserDetail, matcher: match(PageRoutes.UserDetail) }],
  },

  // Posts
  // {
  //   label: 'Posts',
  //   pathname: PageRoutes.Posts,
  //   query: defaultQuery,
  //   icon: BsFillPostcardFill,
  //   matcher: match(PageRoutes.Posts),
  //   children: [
  //     {
  //       label: 'Write Post',
  //       pathname: PageRoutes.WritePost,
  //       matcher: match(PageRoutes.WritePost),
  //     },
  //     {
  //       label: 'Post Detail',
  //       pathname: PageRoutes.PostDetail,
  //       matcher: match(PageRoutes.PostDetail),
  //     },
  //     {
  //       label: 'Edit Post',
  //       pathname: PageRoutes.EditPost,
  //       matcher: match(PageRoutes.EditPost),
  //     },
  //   ],
  // },

  // Tickets
  {
    label: 'Tickets',
    icon: BsFillCollectionFill,
    pathname: PageRoutes.Tickets,
    matcher: match(PageRoutes.Tickets),
    collapsible: true,
    children: [
      {
        label: 'Top of the Rock',
        pathname: PageRoutes.TopOfTheRock,
        matcher: match(PageRoutes.TopOfTheRock),
        icon: BsFill0SquareFill,
        query: ticketQuery,
        children: [{ label: 'Top of the Rock Detail', pathname: PageRoutes.TopOfTheRockDetail, matcher: match(PageRoutes.TopOfTheRockDetail) }],
      },
      {
        label: 'Summit',
        pathname: PageRoutes.Summit,
        matcher: match(PageRoutes.Summit),
        icon: BsFill1SquareFill,
        query: ticketQuery,
        children: [{ label: 'Summit Detail', pathname: PageRoutes.SummitDetail, matcher: match(PageRoutes.SummitDetail) }],
      },
      {
        label: 'Empire',
        pathname: PageRoutes.Empire,
        matcher: match(PageRoutes.Empire),
        icon: BsFill2SquareFill,
        query: ticketQuery,
        children: [{ label: 'Empire Detail', pathname: PageRoutes.EmpireDetail, matcher: match(PageRoutes.EmpireDetail) }],
      },
      {
        label: 'OneWorld',
        pathname: PageRoutes.OneWorld,
        matcher: match(PageRoutes.OneWorld),
        icon: BsFill3SquareFill,
        query: ticketQuery,
        children: [{ label: 'OneWorld Detail', pathname: PageRoutes.OneWorldDetail, matcher: match(PageRoutes.OneWorldDetail) }],
      },
      {
        label: 'Memorial911',
        pathname: PageRoutes.Memorial911,
        matcher: match(PageRoutes.Memorial911),
        icon: BsFill4SquareFill,
        query: ticketQuery,
        children: [{ label: 'Memorial911 Detail', pathname: PageRoutes.Memorial911Detail, matcher: match(PageRoutes.Memorial911Detail) }],
      },
      {
        label: 'UNTour',
        pathname: PageRoutes.UNTour,
        matcher: match(PageRoutes.UNTour),
        icon: BsFill5SquareFill,
        query: ticketQuery,
        children: [{ label: 'UNTour Detail', pathname: PageRoutes.UNTourDetail, matcher: match(PageRoutes.UNTourDetail) }],
      },
      {
        label: 'Wollman',
        pathname: PageRoutes.Wollman,
        matcher: match(PageRoutes.Wollman),
        icon: BsFill6SquareFill,
        query: ticketQuery,
        children: [{ label: 'Wollman Detail', pathname: PageRoutes.WollmanDetail, matcher: match(PageRoutes.WollmanDetail) }],
      },
      {
        label: 'CityTrip',
        pathname: PageRoutes.CityTrip,
        matcher: match(PageRoutes.CityTrip),
        icon: BsFill7SquareFill,
        query: ticketQuery,
        children: [{ label: 'CityTrip Detail', pathname: PageRoutes.CityTripDetail, matcher: match(PageRoutes.CityTripDetail) }],
      },
      {
        label: 'EllisIsland',
        pathname: PageRoutes.EllisIsland,
        matcher: match(PageRoutes.EllisIsland),
        icon: BsFill8SquareFill,
        query: ticketQuery,
        children: [{ label: 'EllisIsland Detail', pathname: PageRoutes.EllisIslandDetail, matcher: match(PageRoutes.EllisIslandDetail) }],
      },
      {
        label: 'MLBMets',
        pathname: PageRoutes.MLBMets,
        matcher: match(PageRoutes.MLBMets),
        icon: BsFill9SquareFill,
        query: ticketQuery,
        children: [{ label: 'MLBMets Detail', pathname: PageRoutes.MLBMetsDetail, matcher: match(PageRoutes.MLBMetsDetail) }],
      },
    ],
  },

  // USIMs
  {
    label: 'Usims',
    icon: BsFillCollectionFill,
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
        children: [{ label: 'T-Mobile Detail', pathname: PageRoutes.TMobileDetail, matcher: match(PageRoutes.TMobileDetail), query: usimQuery }],
      },
      {
        label: 'H2O(Esim)',
        pathname: PageRoutes.H2OEsim,
        matcher: match(PageRoutes.H2OEsim),
        icon: BsFill2SquareFill,
        query: ticketQuery,
        children: [{ label: 'H2O(Esim) Detail', pathname: PageRoutes.H2OEsimDetail, matcher: match(PageRoutes.H2OEsimDetail), query: ticketQuery }],
      },
      {
        label: 'Lyca',
        pathname: PageRoutes.Lyca,
        matcher: match(PageRoutes.Lyca),
        icon: BsFill3SquareFill,
        query: ticketQuery,
        children: [{ label: 'Lyca Portal', pathname: PageRoutes.LycaDetail, matcher: match(PageRoutes.LycaDetail), query: ticketQuery }],
      },
    ],
  },

  // Tours
  {
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
        query: ticketQuery,
        children: [{ label: 'Landmark Detail', pathname: PageRoutes.LandmarkDetail, matcher: match(PageRoutes.LandmarkDetail), query: ticketQuery }],
      },
      {
        label: 'Woodbury',
        pathname: PageRoutes.Woodbury,
        matcher: match(PageRoutes.Woodbury),
        icon: BsFill2SquareFill,
        query: ticketQuery,
        children: [{ label: 'Woodbury Detail', pathname: PageRoutes.WoodburyDetail, matcher: match(PageRoutes.WoodburyDetail), query: ticketQuery }],
      },
      {
        label: 'MetroDocent',
        pathname: PageRoutes.MetroDocent,
        matcher: match(PageRoutes.MetroDocent),
        icon: BsFill3SquareFill,
        query: ticketQuery,
        children: [{ label: 'MetroDocent Detail', pathname: PageRoutes.MetroDocentDetail, matcher: match(PageRoutes.MetroDocentDetail), query: ticketQuery }],
      },
      {
        label: 'MetroDocent(Painting)',
        pathname: PageRoutes.MetroDocentPainting,
        matcher: match(PageRoutes.MetroDocentPainting),
        icon: BsFill3SquareFill,
        query: ticketQuery,
        children: [{ label: 'MetroDocentPainting Detail', pathname: PageRoutes.MetroDocentPaintingDetail, matcher: match(PageRoutes.MetroDocentPaintingDetail), query: ticketQuery }],
      },
      {
        label: 'MomaDocent',
        pathname: PageRoutes.MomaDocent,
        matcher: match(PageRoutes.MomaDocent),
        icon: BsFill4SquareFill,
        query: ticketQuery,
        children: [{ label: 'MomaDocent Detail', pathname: PageRoutes.MomaDocentDetail, matcher: match(PageRoutes.MomaDocentDetail), query: ticketQuery }],
      },
      // {
      //   label: 'GuggenheimDocent',
      //   pathname: PageRoutes.GuggenheimDocent,
      //   matcher: match(PageRoutes.GuggenheimDocent),
      //   icon: BsFill5SquareFill,
      //   query: ticketQuery,
      //   children: [{ label: 'GuggenheimDocent Detail', pathname: PageRoutes.GuggenheimDocentDetail, matcher: match(PageRoutes.GuggenheimDocentDetail), query: ticketQuery }],
      // },
      // {
      //   label: 'WhitneyDocent',
      //   pathname: PageRoutes.WhitneyDocent,
      //   matcher: match(PageRoutes.WhitneyDocent),
      //   icon: BsFill6SquareFill,
      //   query: ticketQuery,
      //   children: [{ label: 'WhitneyDocent Detail', pathname: PageRoutes.WhitneyDocentDetail, matcher: match(PageRoutes.WhitneyDocentDetail), query: ticketQuery }],
      // },
      {
        label: 'SingleDocents',
        pathname: PageRoutes.SingleDocents,
        matcher: match(PageRoutes.SingleDocents),
        icon: BsFill7SquareFill,
        query: ticketQuery,
        children: [{ label: 'SingleDocents Detail', pathname: PageRoutes.SingleDocentsDetail, matcher: match(PageRoutes.SingleDocentsDetail), query: ticketQuery }],
      },
      {
        label: 'AMNHDocent',
        pathname: PageRoutes.AMNHDocent,
        matcher: match(PageRoutes.AMNHDocent),
        icon: BsFill7SquareFill,
        query: ticketQuery,
        children: [{ label: 'AMNHDocent Detail', pathname: PageRoutes.AMNHDocentDetail, matcher: match(PageRoutes.AMNHDocentDetail), query: ticketQuery }],
      },
    ],
  },

  // Tours(Suburbs)
  {
    label: 'Tours(Suburbs)',
    icon: BsFillCollectionFill,
    pathname: PageRoutes.Tours,
    matcher: match(PageRoutes.Tours),
    collapsible: true,
    children: [
      {
        label: 'WashingtonDC',
        pathname: PageRoutes.WashingtonDC,
        matcher: match(PageRoutes.WashingtonDC),
        icon: BsFill1SquareFill,
        query: ticketQuery,
        children: [{ label: 'WashingtonDC Detail', pathname: PageRoutes.WashingtonDCDetail, matcher: match(PageRoutes.WashingtonDCDetail), query: ticketQuery }],
      },
      {
        label: 'Boston',
        pathname: PageRoutes.Boston,
        matcher: match(PageRoutes.Boston),
        icon: BsFill2SquareFill,
        query: ticketQuery,
        children: [{ label: 'Boston Detail', pathname: PageRoutes.BostonDetail, matcher: match(PageRoutes.BostonDetail), query: ticketQuery }],
      },
      {
        label: 'Niagara',
        pathname: PageRoutes.Niagara,
        matcher: match(PageRoutes.Niagara),
        icon: BsFill3SquareFill,
        query: tourQuery,
        children: [{ label: 'Niagara Detail', pathname: PageRoutes.NiagaraDetail, matcher: match(PageRoutes.NiagaraDetail), query: tourQuery }],
      },
    ],
  },
];

export const findNavInHierarchy = (pathname: string, items = navs, parents: Nav[] = []): Nav[] => {
  for (const nav of items) {
    const matched = !!nav.matcher(pathname);
    if (matched) return [...parents, nav];

    if (nav.children) {
      const navs = findNavInHierarchy(pathname, nav.children, [...parents, nav]);
      if (navs.length) return navs;
    } else {
      continue;
    }
  }
  return [];
};
