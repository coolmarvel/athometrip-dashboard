import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<any>();

interface EmpireTableProps {
  empire: any[];
  isLoading?: boolean;
}

const EmpireTable = ({ empire, isLoading }: EmpireTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();

  console.log(empire);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor('billing.first_name', { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => useConvertDate(row.order.date_created), { header: t('date'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? 'default', { header: t('type'), meta: { sortable: true } }),
      columnHelper.accessor(
        (row) => {
          const date = row.tour?.empire_date;
          const time = row.tour?.empire_time;

          return `${date} ${time}`;
        },
        { header: t('schedule'), meta: { sortable: true } }
      ),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: empire, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.EmpireDetail, { id: row.original.order.id }))} />;
};

export default EmpireTable;
