import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useFormatDate, useSafePush } from '@/hooks';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<any>();

interface Memorial911TableProps {
  users: any[];
  isLoading?: boolean;
}

const Memorial911Table = ({ users, isLoading }: Memorial911TableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const formatDate = useFormatDate();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t('ID'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('name', {
        header: t('Name'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('email', {
        header: t('Email'),
        meta: { sortable: true },
      }),
    ],
    [formatDate, t]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.Memorial911Detail, { id: row.original.id }))} />;
};

export default Memorial911Table;
