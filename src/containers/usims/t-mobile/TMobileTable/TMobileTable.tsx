import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TMobileModal } from '../TMobileModal';

const columnHelper = createColumnHelper<any>();

interface TMobileTableProps {
  tMobile: any;
  isLoading?: boolean;
}

const TMobileTable = ({ tMobile, isLoading }: TMobileTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(tMobile: any) => void>(
    (tMobile) => {
      if (!tMobile) return;
      openModal(TMobileModal, { tMobile });
    },
    [openModal]
  );

  console.log(tMobile);

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

  const table = useReactTable({ data: tMobile, columns, getCoreRowModel: getCoreRowModel() });

  // return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.TMobileDetail, { id: row.original.order.id }))} />;
  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default TMobileTable;