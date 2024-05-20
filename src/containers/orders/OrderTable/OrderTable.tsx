import { Post } from '@/apis';
import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useFormatDate, useSafePush } from '@/hooks';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import OrderWriter from './OrderWriter';

const columnHelper = createColumnHelper<any>();

interface OrderTableProps {
  datas: any[];
  isLoading?: boolean;
}

const OrderTable = ({ datas, isLoading }: OrderTableProps) => {
  const { t } = useTranslation();
  const { push } = useSafePush();
  const formatDate = useFormatDate();

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', {
        header: t('ID'),
        meta: { sortable: true },
      }),
      // add
      columnHelper.accessor('order.date_created', {
        header: t('Date'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('order.status', {
        header: t('Status'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('billing.first_name', {
        header: t('Customer'),
        cell: (context) => <OrderWriter writer={context.renderValue()!} />,
        meta: { sortable: true },
      }),
      columnHelper.accessor('billing.email', {
        header: t('Email'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('createdAt', {
        header: t('Created At'),
        cell: (context) => formatDate(context.renderValue()!),
        meta: { sortable: true },
      }),
      columnHelper.accessor('updatedAt', {
        header: t('Updated At'),
        cell: (context) => formatDate(context.renderValue()!),
        meta: { sortable: true },
      }),
    ],
    [formatDate, t]
  );

  const table = useReactTable({
    data: datas,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<Post> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.PostDetail, { id: row.original.id }))} />;
};

export default OrderTable;
