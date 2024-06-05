import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<any>();

interface TMobileDailyTableProps {
  tMobileDaily: any;
  isLoading?: boolean;
}

const TMobileDailyTable = ({ tMobileDaily, isLoading }: TMobileDailyTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  console.log(tMobileDaily);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor('billing.first_name', { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('date'), cell: (context) => convertDate(context.renderValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('period'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.usimInfo?.esim_device ?? ''}`, { header: t('model'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.usimInfo?.esim_eid ?? ''}`, { header: t('eid'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.usimInfo?.esim_imei ?? ''}`, { header: t('iemi'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.usimInfo?.att_tmobile_date ?? ''}`, {
        header: t('activate'),
        cell: (context: any) => convertDate(context.renderValue()!).split(' ')[0],
        meta: { sortable: true },
      }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: tMobileDaily, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.TMobileDailyDetail, { id: row.original.order.id }))} />;
};

export default TMobileDailyTable;
