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