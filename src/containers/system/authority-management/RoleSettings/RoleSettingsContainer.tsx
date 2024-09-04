import { UserTableContainer } from '@/containers';
import { RoleTableContainer } from '@/containers/system/authority-management/RoleSettings/RoleTable';
import { useRouter } from 'next/router';
import { useGetRolesAll } from '@/apis/system/authority-management/authority-management';

/**
 * 역할 설정 컨테이너
 *
 * @constructor
 * @author 김이안
 */
const RoleSettingsContainer = () => {
  const router = useRouter();
  const { data: rolesAll, isLoading: isLoading } = useGetRolesAll();

  return (
    <>
      <RoleTableContainer roles={rolesAll ?? []} isLoading={isLoading} />
    </>
  );
};

export default RoleSettingsContainer;
