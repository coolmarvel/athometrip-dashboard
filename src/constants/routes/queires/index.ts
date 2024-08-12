import { subWeeks } from 'date-fns';

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

const after = subWeeks(new Date(), 1).toISOString().split('T')[0];
const before = new Date().toISOString().split('T')[0];

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