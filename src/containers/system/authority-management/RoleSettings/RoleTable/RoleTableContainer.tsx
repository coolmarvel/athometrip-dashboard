import { useMemo } from 'react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { DataTable } from '@/components';

type Role = {
  id: number;
  roleGroup: string;
  roleType: string;
  roleCode: string;
  roleName: string;
}

interface RolesTableProps {
  // users: User[];
  roles: any; // TODO Props에서 any로 사용하고 있는 모든 객체 수정 필요
  isLoading?: boolean;
}

/**
 * 역할 테이블 Container
 *
 * @constructor
 * @author 김이안
 */
const RoleTableContainer = ({ roles, isLoading }: RolesTableProps) => {
  const columnHelper = createColumnHelper<Role>();
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t('역할 ID'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('roleGroup', {
        header: t('역할 그룹'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('roleType', {
        header: t('역할 유형'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('roleCode', {
        header: t('역할 코드'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('roleName', {
        header: t('역할명'),
        meta: { sortable: true },
      }),
    ], [columnHelper, t],
  );

  const table = useReactTable({
    data: roles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<any> table={table} isLoading={isLoading} />;
};

export default RoleTableContainer;
