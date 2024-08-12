import { IconType } from 'react-icons';
import { MatchFunction } from 'path-to-regexp';

import { PageRoutes } from '../routes';

export interface Nav {
  label: string;
  pathname: PageRoutes;
  query?: Record<string, number | string>;
  icon?: IconType;
  matcher: MatchFunction;
  children?: Nav[];
  collapsible?: boolean;
}