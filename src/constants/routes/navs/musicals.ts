import { match } from 'path-to-regexp';
import { BsFillCollectionFill } from 'react-icons/bs';

import { Nav } from './nav-interface';
import { PageRoutes } from '../routes';
import { normalQuery } from '../queires';

export const musicalsNav: Nav = {
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
};