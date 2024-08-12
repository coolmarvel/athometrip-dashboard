import { match } from 'path-to-regexp';
import { FaCogs, FaKey, FaUser } from 'react-icons/fa';

import { Nav } from './nav-interface';
import { PageRoutes } from '../routes';
import { userQuery } from '../queires';

export const systemsNav: Nav = {
  label: 'System Management',
  icon: FaCogs,
  pathname: PageRoutes.SystemManagement,
  matcher: match(PageRoutes.SystemManagement),
  collapsible: true,
  children: [
    {
      label: 'User Management',
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
      label: 'Authority Management',
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
};