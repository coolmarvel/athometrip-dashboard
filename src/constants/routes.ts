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

export interface Nav {
  label: string;
  pathname: PageRoutes;
  query?: Record<string, number | string>;
  icon?: IconType;
  matcher: MatchFunction;
  children?: Nav[];
  collapsible?: boolean;
}

const after: string = format(subMonths(new Date(), 1), 'yyyy-MM-dd', { locale: ko });
const before: string = format(new Date(), 'yyyy-MM-dd', { locale: ko });

export const defaultQuery = {
  view: ViewQueries.Table,
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  after: after,
  before: before,
  product: '',
  total: 0,
  search: '',
};

// t("Users")
// t("User Detail")
// t("Posts")
// t("Write Post")
// t("Post Detail")
export const navs: Nav[] = [
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
        query: defaultQuery,
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
        query: defaultQuery,
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
        query: defaultQuery,
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
        query: defaultQuery,
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
        query: defaultQuery,
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
        query: defaultQuery,
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
        query: defaultQuery,
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
        query: defaultQuery,
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
        query: defaultQuery,
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
        query: defaultQuery,
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
