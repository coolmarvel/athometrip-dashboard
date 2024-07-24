import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<any>();

interface CityTripTableProps {
  cityTrip: any[];
  isLoading?: boolean;
}

const CityTripTable = ({ cityTrip, isLoading }: CityTripTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
      columnHelper.accessor(
        (row) => {
          const date = row.tour.wollman_date;
          const time = row.tour.wollman_time;

          return `${date} ${time}`;
        },
        { header: t('schedule(1)') },
      ),
      columnHelper.accessor(
        (row) => {
          const date = row.tour.wollman_date;
          const time = row.tour.wollman_time_2;

          return `${date} ${time}`;
        },
        { header: t('schedule(2)') },
      ),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: cityTrip, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.CityTripDetail, { id: row.original.order.id }))} />;
};

export default CityTripTable;
