import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<any>();

interface EllisIslandTableProps {
  ellisIsland: any[];
  isLoading?: boolean;
}

const EllisIslandTable = ({ ellisIsland, isLoading }: EllisIslandTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  console.log(ellisIsland);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor('billing.first_name', { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('row.order.date_created', { header: t('date'), cell: (context) => convertDate(context.renderValue()), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? 'default', { header: t('type'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.tour?.ellis_island_date} ${row.tour?.oneworld_time}`, { header: t('schedule'), meta: { sortable: true } }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: ellisIsland, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.EllisIslandDetail, { id: row.original.order.id }))} />;
};

export default EllisIslandTable;
