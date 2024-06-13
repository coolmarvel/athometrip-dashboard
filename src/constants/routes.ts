import { format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { MatchFunction, match } from 'path-to-regexp';
import { IconType } from 'react-icons';
import {
  BsFillPostcardFill,
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
  LikedPost = 'api/posts/liked',

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
  TMobileDaily = 'api/usims/t-mobile/daily/:id?',
  TMobileDailyOther = 'api/usims/t-mobile/other/:id?',
  TMobileMonthly = 'api/usims/t-mobile/monthly/:id?',
  TMobileMonthlyPlan = 'api/usims/t-mobile/monthly-plan/:id?',
  H2OEsim = 'api/usims/h2osim/esim/:id?',
  LycaPortal = 'api/usims/lyca/portal/:id?',
  LycaMonthlyPlan = 'api/usims/lyca/monthly-plan/:id?',
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
  TMobileDaily = '/usims/t-mobile/daily',
  TMobileDailyDetail = '/usims/t-mobile/daily/:id',
  TMobileDailyOther = '/usims/t-mobile/other',
  TMobileDailyOtherDetail = '/usims/t-mobile/other/:id',
  TMobileMonthly = '/usims/t-mobile/monthly',
  TMobileMonthlyDetail = '/usims/t-mobile/monthly/:id',

  H2OSim = '/usims/h2osim',
  H2OEsim = '/usims/h2osim/esim',
  H2OEsimDetail = 'usims/h2osim/esim/:id',

  Lyca = '/usims/lyca',
  LycaPortal = '/usims/lyca/portal',
  LycaPortalDetail = '/usims/lyca/portal/:id',
  LycaMonthlyPlan = '/usims/lyca/monthly-plan',
  LycaMonthlyPlanDetail = '/usims/lyca/monthly-plan/:id',
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
  Daily = 'daily',
  Monthly = 'monthly',
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

const after: string = format(subMonths(new Date(), 1), 'yyyy-MM-dd', { locale: ko });
const before: string = format(new Date(), 'yyyy-MM-dd', { locale: ko });

export const ticketQuery = {
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  // after: after,
  // before: before,
};

export const usimQuery = {
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  mode: ModeQueries.Usim,
  after: after,
  before: before,
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
    children: [
      {
        label: 'User Detail',
        pathname: PageRoutes.UserDetail,
        matcher: match(PageRoutes.UserDetail),
      },
    ],
  },

  // Posts
  {
    label: 'Posts',
    pathname: PageRoutes.Posts,
    query: defaultQuery,
    icon: BsFillPostcardFill,
    matcher: match(PageRoutes.Posts),
    children: [
      {
        label: 'Write Post',
        pathname: PageRoutes.WritePost,
        matcher: match(PageRoutes.WritePost),
      },
      {
        label: 'Post Detail',
        pathname: PageRoutes.PostDetail,
        matcher: match(PageRoutes.PostDetail),
      },
      {
        label: 'Edit Post',
        pathname: PageRoutes.EditPost,
        matcher: match(PageRoutes.EditPost),
      },
    ],
  },

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
        children: [
          {
            label: 'Top of the Rock Detail',
            pathname: PageRoutes.TopOfTheRockDetail,
            matcher: match(PageRoutes.TopOfTheRockDetail),
          },
        ],
      },
      {
        label: 'Summit',
        pathname: PageRoutes.Summit,
        matcher: match(PageRoutes.Summit),
        icon: BsFill1SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'Summit Detail',
            pathname: PageRoutes.SummitDetail,
            matcher: match(PageRoutes.SummitDetail),
          },
        ],
      },
      {
        label: 'Empire',
        pathname: PageRoutes.Empire,
        matcher: match(PageRoutes.Empire),
        icon: BsFill2SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'Empire Detail',
            pathname: PageRoutes.EmpireDetail,
            matcher: match(PageRoutes.EmpireDetail),
          },
        ],
      },
      {
        label: 'OneWorld',
        pathname: PageRoutes.OneWorld,
        matcher: match(PageRoutes.OneWorld),
        icon: BsFill3SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'OneWorld Detail',
            pathname: PageRoutes.OneWorldDetail,
            matcher: match(PageRoutes.OneWorldDetail),
          },
        ],
      },
      {
        label: 'Memorial911',
        pathname: PageRoutes.Memorial911,
        matcher: match(PageRoutes.Memorial911),
        icon: BsFill4SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'Memorial911 Detail',
            pathname: PageRoutes.Memorial911Detail,
            matcher: match(PageRoutes.Memorial911Detail),
          },
        ],
      },
      {
        label: 'UNTour',
        pathname: PageRoutes.UNTour,
        matcher: match(PageRoutes.UNTour),
        icon: BsFill5SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'UNTour Detail',
            pathname: PageRoutes.UNTourDetail,
            matcher: match(PageRoutes.UNTourDetail),
          },
        ],
      },
      {
        label: 'Wollman',
        pathname: PageRoutes.Wollman,
        matcher: match(PageRoutes.Wollman),
        icon: BsFill6SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'Wollman Detail',
            pathname: PageRoutes.WollmanDetail,
            matcher: match(PageRoutes.WollmanDetail),
          },
        ],
      },
      {
        label: 'CityTrip',
        pathname: PageRoutes.CityTrip,
        matcher: match(PageRoutes.CityTrip),
        icon: BsFill7SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'CityTrip Detail',
            pathname: PageRoutes.CityTripDetail,
            matcher: match(PageRoutes.CityTripDetail),
          },
        ],
      },
      {
        label: 'EllisIsland',
        pathname: PageRoutes.EllisIsland,
        matcher: match(PageRoutes.EllisIsland),
        icon: BsFill8SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'EllisIsland Detail',
            pathname: PageRoutes.EllisIslandDetail,
            matcher: match(PageRoutes.EllisIslandDetail),
          },
        ],
      },
      {
        label: 'MLBMets',
        pathname: PageRoutes.MLBMets,
        matcher: match(PageRoutes.MLBMets),
        icon: BsFill9SquareFill,
        query: ticketQuery,
        children: [
          {
            label: 'MLBMets Detail',
            pathname: PageRoutes.MLBMetsDetail,
            matcher: match(PageRoutes.MLBMetsDetail),
          },
        ],
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
        label: 'H2OSim',
        pathname: PageRoutes.H2OSim,
        matcher: match(PageRoutes.H2OSim),
        icon: BsFill2SquareFill,
        collapsible: true,
        children: [
          {
            label: 'H2OEsim',
            pathname: PageRoutes.H2OEsim,
            matcher: match(PageRoutes.H2OEsim),
            query: usimQuery,
            children: [
              {
                label: 'H2OEsim Detail',
                pathname: PageRoutes.H2OEsimDetail,
                matcher: match(PageRoutes.H2OEsimDetail),
              },
            ],
          },
        ],
      },
      {
        label: 'Lyca',
        pathname: PageRoutes.Lyca,
        matcher: match(PageRoutes.Lyca),
        icon: BsFill3SquareFill,
        collapsible: true,
        children: [
          {
            label: 'Lyca Portal',
            pathname: PageRoutes.LycaPortal,
            matcher: match(PageRoutes.LycaPortal),
            query: usimQuery,
            children: [
              {
                label: 'Lyca Portal Detail',
                pathname: PageRoutes.LycaPortalDetail,
                matcher: match(PageRoutes.LycaPortalDetail),
              },
            ],
          },
          {
            label: 'Monthly Plan',
            pathname: PageRoutes.LycaMonthlyPlan,
            matcher: match(PageRoutes.LycaMonthlyPlan),
            query: usimQuery,
            children: [
              {
                label: 'Monthly Plan Detail',
                pathname: PageRoutes.LycaMonthlyPlanDetail,
                matcher: match(PageRoutes.LycaMonthlyPlanDetail),
              },
            ],
          },
        ],
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
