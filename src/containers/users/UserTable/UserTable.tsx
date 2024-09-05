import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { toUrl } from '@/utils';
import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { UserUpdateModal } from '@/containers';
import { ApiRoutes, PageRoutes } from '@/constants';
import { User, useApproveUser, useDeleteUser } from '@/apis';
import { useFormatDate, useQueryKeyParams, useSafePush } from '@/hooks';

import UserName from './UserName';
import UserActions from './UserActions';
import UserApproved from './UserApproved';

const columnHelper = createColumnHelper<any>();

interface UsersTableProps {
  users: any[];
  isLoading?: boolean;
}

const UserTable = ({ users, isLoading }: UsersTableProps) => {
  const { push } = useSafePush();
  const { original } = useFormatDate();
  const { t } = useTranslation();

  const { openModal } = useModalStore(['openModal']);
  const { openConfirm } = useModalStore(['openConfirm']);

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.User));
  const { mutate: deleteUser } = useDeleteUser(queryKeyParams);
  const { mutate: approveUser } = useApproveUser(queryKeyParams);

  const handleUpdate = useCallback<(user: User) => void>(
    (user) => {
      if (!user) return;
      openModal(UserUpdateModal, { user });
    },
    [openModal],
  );

  const handleApprove = useCallback<(id: number) => void>(
    (id) => {
      openConfirm({
        title: t('Approve User'),
        content: t('Are you sure you want to approve this user?'),
        onConfirm: () => approveUser({ id }),
      });
    },
    [approveUser, openConfirm, t],
  );

  const handleDelete = useCallback<(id: number) => void>(
    (id) => {
      openConfirm({
        title: t('Delete User'),
        content: t('Are you sure you want to delete this user?'),
        onConfirm: () => deleteUser(id),
      });
    },
    [deleteUser, openConfirm, t],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t('ID'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('name', {
        header: t('User Name'),
        cell: (context) => <UserName name={context.row.original.name} profile={context.row.original.profile} />,
        meta: { sortable: true },
      }),
      columnHelper.accessor('email', {
        header: t('Email'),
        meta: {
          sortable: true,
        },
      }),
      columnHelper.accessor('phone', {
        header: t('Phone'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('approved', {
        header: t('Approval Status'),
        cell: (context) => (
          <UserApproved
            approved={context.row.original.approved}
            onApprove={(e) => {
              e.stopPropagation();
              handleApprove(context.row.original.id);
            }}
          />
        ),
        meta: { sortable: true },
      }),
      columnHelper.accessor('createdAt', {
        header: t('Created At'),
        cell: (context) => original(context.renderValue()!),
        meta: { sortable: true },
      }),
      columnHelper.accessor('updatedAt', {
        header: t('Updated At'),
        cell: (context) => original(context.renderValue()!),
        meta: { sortable: true },
      }),
      columnHelper.display({
        id: 'actions',
        header: t('Actions'),
        cell: (context) => (
          <UserActions
            onUpdate={(e) => {
              e.stopPropagation();
              handleUpdate(context.row.original);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              handleDelete(context.row.original.id);
            }}
          />
        ),
      }),
    ],
    [original, handleApprove, handleDelete, handleUpdate, t],
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<User> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.UserDetail, { id: row.original.id }))} />;
};

export default UserTable;
