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
