import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<any>();

interface SummitTableProps {
  summit: any[];
  isLoading?: boolean;
}

const SummitTable = ({ summit, isLoading }: SummitTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  console.log(summit);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('date'), cell: (context) => convertDate(context.renderValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? 'default', { header: t('type'), meta: { sortable: true } }),
      columnHelper.accessor(
        (row) => {
          const date = row.tour?.date_summit === null ? row.tour?.summit_night_date : row.tour?.date_summit;
          const time = row.tour?.summit_daytime_time === null ? row.tour?.summit_night_time : row.tour?.summit_daytime_time;

          return `${date} ${time}`;
        },
        { header: t('schedule(1)'), meta: { sortable: true } }
      ),
      columnHelper.accessor(
        (row) => {
          const date = row.tour?.date_summit === null ? row.tour?.summit_night_date : row.tour?.date_summit;
          const time2 = row.tour?.summ_time_2 === null ? row.tour?.summit_night_time : row.tour?.summ_time_2;

          return `${date} ${time2}`;
        },
        { header: t('schedule(2)'), meta: { sortable: true } }
      ),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: summit, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.SummitDetail, { id: row.original.order.id }))} />;
};

export default SummitTable;
