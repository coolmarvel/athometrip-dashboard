/**
 * 유저 관리 API 모음
 *
 * @author 김이안
 */
import { useGetPage, useInvalidate, usePost } from '@/apis';
import { ApiRoutes } from '@/constants';
import { UseYn } from '@/enums/useYn';
import { toUrl } from '@/utils';

type User = {
  userId: string;
  userName: string;
  emailAddress: string;
  password: string;
  companyCode: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  useYn: UseYn;
}

/**
 * 유저 전체 조회 API
 * GET /api/system/user-management?page=1&limit=10
 */
export const useGetUsersAll = () => {
  return useGetPage<User[]>(toUrl(ApiRoutes.UserManagement));
};

/**
 * 의존성 추적
 * - 조회하는 값이 렌더링 되기 전에 undefined 로 될 경우 사용
 * DELETE /api/system/user-Management/reset
 */
export const useResetUsers = () => {
  return usePost(`${toUrl(ApiRoutes.UserManagement)}/reset`, undefined, { onSuccess: useInvalidate(toUrl(ApiRoutes.UserManagement)) });
};
