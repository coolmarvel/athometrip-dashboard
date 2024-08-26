import { match } from 'path-to-regexp';
import { IoMusicalNotes } from 'react-icons/io5';
import { RxTransparencyGrid } from 'react-icons/rx';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const musicalsNav: Nav = {
  label: 'Musicals',
  pathname: PageRoutes.Musicals,
  query: normalQuery,
  icon: IoMusicalNotes,
  matcher: match(PageRoutes.Musicals),
  collapsible: false,
  children: [{ label: 'Musicals Detail', icon: RxTransparencyGrid, pathname: PageRoutes.MusicalsDetail, matcher: match(PageRoutes.MusicalsDetail) }],
};