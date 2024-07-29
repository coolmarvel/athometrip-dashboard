import { useGetPage } from '@/apis';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

/**
 * 권한 관리 API 모음
 *
 * @author 김이안
 */
type Role = {
  id: number;
  roleGroup: string;
  roleYype: string;
  roleCode: string;
  roleName: string;
}

/**
 * 역할 전체 조회 API
 * GET /api/system/authority-management/role-settings?page=1&limit=10
 */
export const useGetRolesAll = () => {
  return useGetPage<Role[]>(toUrl(ApiRoutes.RoleSettings));
};
