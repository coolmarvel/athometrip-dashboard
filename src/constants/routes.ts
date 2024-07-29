/**
 * 라우팅 로직을 처리하는 파일
 *
 * @author 이성현
 */
import { MatchFunction, match } from 'path-to-regexp';
import { IconType } from 'react-icons';
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
  BsFillCollectionFill,
} from 'react-icons/bs';
import { FaCogs, FaUser, FaKey } from 'react-icons/fa';

export enum ApiRoutes {
  Upload = '/api/upload',
  Signin = '/api/auth/signin',
  Signout = '/api/auth/signout',
  Me = '/api/auth/me',
  User = '/api/users/:id?',
  ApproveUser = '/api/users/:id?/approve',
  Post = '/api/posts/:id?',
  // LikedPost = '/api/posts/liked',

  // Tickets
  Empire = '/api/tickets/empire/:id?',
  Summit = '/api/tickets/summit/:id?',
  UNTour = '/api/tickets/un-tour/:id?',
  Wollman = '/api/tickets/wollman/:id?',
  MLBMets = '/api/tickets/mlb-mets/:id?',
  CityTrip = '/api/tickets/city-trip/:id?',
  OneWorld = '/api/tickets/one-world/:id?',
  EllisIsland = '/api/tickets/ellis-island/:id?',
  Memorial911 = '/api/tickets/911-memorial/:id?',
  TopOfTheRock = '/api/tickets/top-of-the-rock/:id?',

  // USIMs
  TMobile = '/api/usims/t-mobile/:id?',
  H2OEsim = '/api/usims/h2o-esim/:id?',
  Lyca = '/api/usims/lyca/:id?',

  // Tours
  Landmark = '/api/tours/landmark/:id?',
  Woodbury = '/api/tours/woodbury/:id?',
  MomaDocent = '/api/tours/moma-docent/:id?',
  AMNHDocent = '/api/tours/amnh-docent/:id?',
  MetroDocent = '/api/tours/metro-docent/:id?',
  MetroDocentPainting = '/api/tours/metro-docent-painting/:id?',
  WhitneyDocent = '/api/tours/whitney-docent/:id?',
  GuggenheimDocent = '/api/tours/guggenheim-docent/:id?',
  SingleDocents = '/api/tours/single-docents/:id?',

  // Tours(Suburbs)
  WashingtonDC = '/api/tours/washington-dc/:id?',
  Boston = '/api/tours/boston/:id?',
  NiagaraTwoDays = '/api/tours/niagara-twodays/:id?',
  NiagaraOneDayKingKong = '/api/tours/niagara-oneday-kingkong/:id?',
  NiagaraOneDayAthometrip = '/api/tours/niagara-oneday-athometrip/:id?',

  // System
  UserManagement = '/api/system/user-management',
  UserDetailInformation = '/api/system/user-management/user/:id',
  AuthorityManagement = '/api/system/authority-management',
  RoleSettings = '/api/system/authority-management/role-settings',

  // Shuttle
  ToJFK = '/api/shuttles/to-jfk/:id?', // JFK -> NY, JFK -> NJ
  ToNYNJ = '/api/shuttles/to-nynj/:id?', // NY -> JFK, JFK -> NJ, EWR -> NY/NJ
  ToEWR = '/api/shuttles/to-ewr/:id?', // NY/NJ -> EWR
  ToNYNJEWR = '/api/shuttles/to-nynj-ewr/:id?',
  ToJFKNight = '/api/shuttles/to-jfk-night/:id?',
  ToNYNight = '/api/shuttles/to-ny-night/:id?',

  // Snaps
  Modern = '/api/snaps/modern/:id?',
  Vintage = '/api/snaps/vintage/:id?',

  // Stays
  Stays = '/api/stays/:id?',

  // Musicals
  Musicals = '/api/musicals/:id?',
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
  // GuggenheimDocent = '/tours/guggenheim-docent',
  // GuggenheimDocentDetail = '/tours/guggenheim-docent/:id',
  // WhitneyDocent = '/tours/whitney-docent',
  // WhitneyDocentDetail = '/tours/whitney-docent/:id',
  AMNHDocent = '/tours/amnh-docent', // American Museum of Nature History
  AMNHDocentDetail = '/tours/amnh-docent/:id',
  SingleDocents = '/tours/single-docents',
  SingleDocentsDetail = '/tours/single-docents/:id',

  // Tours(Suburbs)
  WashingtonDC = '/tours/washington-dc',
  WashingtonDCDetail = '/tours/washington-dc/:id',
  Boston = '/tours/boston',
  BostonDetail = '/tours/boston/:id',
  NiagaraTwoDays = '/tours/niagara-twodays',
  NiagaraTwoDaysDetail = '/tours/niagara-twodays/:id',
  NiagaraOneDayKingKong = '/tours/niagara-oneday-kingkong',
  NiagaraOneDayKingKongDetail = '/tours/niagara-oneday-kingkong/:id',
  NiagaraOneDayAthometrip = '/tours/niagara-oneday-athometrip',
  NiagaraOneDayAthometripDetail = '/tours/niagara-oneday-athometrip/:id',

  /**
   * SystemManagement: 시스템 관리
   * UserManagement: 유저 관리
   */
  SystemManagement = '/system',
  UserManagement = '/system/user-management',
  UserDetailInformation = '/system/user-management/user/:id',
  AuthorityManagement = '/system/authority-management',

  // Shuttles
  Shuttles = '/shuttles',
  ToJFK = '/shuttles/to-jfk',
  ToJFKDetail = '/shuttles/to-jfk/:id',
  ToNYNJ = '/shuttles/to-nynj',
  ToNYNJDetail = '/shuttles/to-nynj/:id',
  ToEWR = '/shuttles/to-ewr',
  ToEWRDetail = '/shuttles/to-ewr/:id',
  ToNYNJEWR = '/shuttles/to-nynj-ewr',
  ToNYNJEWRDetail = '/shuttles/to-nynj-ewr/:id',
  ToJFKNight = '/shuttles/to-jfk-night',
  ToJFKNightDetail = '/shuttles/to-jfk-night/:id',
  ToNYNight = '/shuttles/to-ny-night',
  ToNYNightDetail = '/shuttles/to-ny-night/:id',

  // Snaps
  Snaps = '/snaps',
  Modern = '/snaps/modern',
  ModernDetail = '/snaps/modern/:id',
  Vintage = '/snaps/vintage',
  VintageDetail = '/snaps/vintage/:id',

  // Stays
  Stays = '/stays',
  StaysDetail = '/stays/:id',

  // Musicals
  Musicals = '/musicals',
  MusicalsDetail = '/musicals/:id',
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

export const normalQuery = {
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

export const userQuery = {
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  search: '',
};

// t("UserPageContainer")
// t("Users")
// t("User Detail")
// t("Posts")
// t("Write Post")
// t("Post Detail")
export const navs: Nav[] = [
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
        query: normalQuery,
        children: [{ label: 'WashingtonDC Detail', pathname: PageRoutes.WashingtonDCDetail, matcher: match(PageRoutes.WashingtonDCDetail), query: normalQuery }],
      },
      {
        label: 'Boston',
        pathname: PageRoutes.Boston,
        matcher: match(PageRoutes.Boston),
        icon: BsFill2SquareFill,
        query: normalQuery,
        children: [{ label: 'Boston Detail', pathname: PageRoutes.BostonDetail, matcher: match(PageRoutes.BostonDetail), query: normalQuery }],
      },
      {
        label: 'Niagara(TwoDays)',
        pathname: PageRoutes.NiagaraTwoDays,
        matcher: match(PageRoutes.NiagaraTwoDays),
        icon: BsFill3SquareFill,
        query: normalQuery,
        children: [{ label: 'Niagara(TwoDays) Detail', pathname: PageRoutes.NiagaraTwoDaysDetail, matcher: match(PageRoutes.NiagaraTwoDaysDetail), query: normalQuery }],
      },
      {
        label: 'Niagara(Athometrip)',
        pathname: PageRoutes.NiagaraOneDayAthometrip,
        matcher: match(PageRoutes.NiagaraOneDayAthometrip),
        icon: BsFill3SquareFill,
        query: normalQuery,
        children: [{ label: 'Niagara(Athometrip) Detail', pathname: PageRoutes.NiagaraOneDayAthometripDetail, matcher: match(PageRoutes.NiagaraOneDayAthometripDetail), query: normalQuery }],
      },
      {
        label: 'Niagara(KingKong)',
        pathname: PageRoutes.NiagaraOneDayKingKong,
        matcher: match(PageRoutes.NiagaraOneDayKingKong),
        icon: BsFill3SquareFill,
        query: normalQuery,
        children: [{ label: 'Niagara(KingKong) Detail', pathname: PageRoutes.NiagaraOneDayKingKongDetail, matcher: match(PageRoutes.NiagaraOneDayKingKongDetail), query: normalQuery }],
      },
    ],
  },

  // Shuttles
  /**
   * 권한 관련 데이터값
   *
   * 권한 하드 코딩으로 일단 처리하는 것으로
   *
   * 권한, 역할에 대한 비교 작업의 코드가 필요함
   *
   *
   */
  {
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
  },

  // Snaps
  {
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
  },

  // Stays
  {
    label: 'Stays',
    pathname: PageRoutes.Stays,
    query: normalQuery,
    icon: BsFillCollectionFill,
    matcher: match(PageRoutes.Stays),
    children: [
      {
        label: 'Stays Detail',
        pathname: PageRoutes.StaysDetail,
        matcher: match(PageRoutes.StaysDetail),
      },
    ],
  },

  // Musicals
  {
    label: 'Musicals',
    pathname: PageRoutes.Musicals,
    query: normalQuery,
    icon: BsFillCollectionFill,
    matcher: match(PageRoutes.Musicals),
    children: [
      {
        label: 'Musicals Detail',
        pathname: PageRoutes.MusicalsDetail,
        matcher: match(PageRoutes.MusicalsDetail),
      },
    ],
  },

  // Systems
  {
    label: '시스템 관리',
    icon: FaCogs,
    pathname: PageRoutes.SystemManagement,
    matcher: match(PageRoutes.SystemManagement),
    collapsible: true,
    children: [
      {
        label: '유저 관리',
        pathname: PageRoutes.UserManagement,
        matcher: match(PageRoutes.UserManagement),
        icon: FaUser,
        query: userQuery,
        children: [
          {
            label: '유저 상세 정보',
            pathname: PageRoutes.UserDetailInformation,
            matcher: match(PageRoutes.UserDetailInformation),
            query: userQuery,
          },
        ],
      },
      {
        label: '권한 관리',
        pathname: PageRoutes.AuthorityManagement,
        matcher: match(PageRoutes.AuthorityManagement),
        icon: FaKey,
        query: userQuery,
        // 세부 메뉴가 탭으로 관리되어 있어서 임시로 children 생성
        children: [
          {
            label: '',
            pathname: PageRoutes.AuthorityManagement,
            matcher: match(PageRoutes.AuthorityManagement),
            query: userQuery,
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
