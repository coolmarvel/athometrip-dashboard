/**
 * 유저 테이블 컨테이너
 *
 * @author 이성현
 */
import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useFormatDate, useSafePush } from '@/hooks';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UseYn } from '@/enums/useYn';
import { CompanyCodeEnum } from '@/enums/CompanyCodeEnum';

const columnHelper = createColumnHelper<User>();

type User = {
  userId: string;
  userName: string;
  emailAddress: string;
  password: string;
  companyCode: CompanyCodeEnum;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  useYn: UseYn;
}

interface UsersTableProps {
  // users: User[];
  users: any; // TODO Props에서 any로 사용하고 있는 모든 객체 수정 필요
  isLoading?: boolean;
}

const UserTableContainer = ({ users, isLoading }: UsersTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const { formatDateToYYYYMMDD } = useFormatDate();

  const columns = useMemo(
    () => [
      columnHelper.accessor('userId', {
        header: t('유저 ID'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('userName', {
        header: t('유저명'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('emailAddress', {
        header: t('Email'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('companyCode', {
        header: t('회사명'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('department', {
        header: t('부서'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('createdAt', {
        header: t('Created At'),
        cell: (context) => formatDateToYYYYMMDD(context.renderValue()!),
        meta: { sortable: true },
      }),
      columnHelper.accessor('updatedAt', {
        header: t('Updated At'),
        cell: (context) => formatDateToYYYYMMDD(context.renderValue()!),
        meta: { sortable: true },
      }),
    ],
    [formatDateToYYYYMMDD, t],
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<User> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.UserDetailInformation, { id: row.original.userId }))} />;
};

export default UserTableContainer;
