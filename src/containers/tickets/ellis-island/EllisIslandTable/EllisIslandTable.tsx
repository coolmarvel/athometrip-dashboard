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
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('date'), cell: (context) => convertDate(context.renderValue()!), meta: { sortable: true } }),
      columnHelper.accessor('', { header: t('type'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.tour?.ellis_island_date}`, { header: t('schedule(date)'), meta: { sortable: true } }),
      columnHelper.accessor(
        (row) => {
          const ellisIslandTime = row.order.metadata.find((meta: any) => meta.key === 'ellis_island_time')?.value;
          const ellisIslandTime2 = row.order.metadata.find((meta: any) => meta.key === 'ellis_island_time2')?.value;

          let schedule = '';
          if (ellisIslandTime && ellisIslandTime2) schedule = `${ellisIslandTime} / ${ellisIslandTime2}`;
          else if (ellisIslandTime) schedule = ellisIslandTime;
          else if (ellisIslandTime2) schedule = ellisIslandTime2;

          return schedule;
        },
        {
          header: t('schedule(time)'),
          meta: { sortable: true },
        }
      ),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: ellisIsland, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.EllisIslandDetail, { id: row.original.order.id }))} />;
};

export default EllisIslandTable;
