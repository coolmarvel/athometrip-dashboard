import { match } from 'path-to-regexp';
import { BsFillPostcardFill } from 'react-icons/bs';
import { RxTransparencyGrid } from 'react-icons/rx';

import { Nav } from '@/constants';
import { PageRoutes } from '../routes';
import { defaultQuery } from '../queires';

export const postsNav: Nav = {
  label: 'Posts',
  pathname: PageRoutes.Posts,
  query: defaultQuery,
  icon: BsFillPostcardFill,
  matcher: match(PageRoutes.Posts),
  collapsible: false,
  children: [
    {
      label: 'Write Post',
      icon: RxTransparencyGrid,
      pathname: PageRoutes.WritePost,
      matcher: match(PageRoutes.WritePost),
    },
    {
      label: 'Post Detail',
      icon: RxTransparencyGrid,
      pathname: PageRoutes.PostDetail,
      matcher: match(PageRoutes.PostDetail),
    },
    {
      label: 'Edit Post',
      icon: RxTransparencyGrid,
      pathname: PageRoutes.EditPost,
      matcher: match(PageRoutes.EditPost),
    },
  ],
};
