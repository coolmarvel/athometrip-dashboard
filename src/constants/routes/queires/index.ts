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

const after = new Date(new Date().setDate(new Date().getDate() - 1))
  .toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replace(/. /g, '-')
  .replace('.', '');

const before = new Date()
  .toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .replace(/. /g, '-')
  .replace('.', '');

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
  after: after,
  before: before,
  search: '',
};

export const usimQuery = {
  page: 1,
  limit: 10,
  sort: 'id',
  order: 'desc',
  after: after,
  before: before,
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
