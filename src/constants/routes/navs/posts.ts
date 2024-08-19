import { BsFillPostcardFill } from 'react-icons/bs';
import { match } from 'path-to-regexp';

import { Nav } from './nav-interface';
import { PageRoutes } from '../routes';
import { defaultQuery } from '../queires';

export const postsNav: Nav = {
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
};
