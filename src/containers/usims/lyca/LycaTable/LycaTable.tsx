import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LycaModal } from '../LycaModal';

const columnHelper = createColumnHelper<any>();

interface LycaTableProps {
  lyca: any;
  isLoading?: boolean;
}

const LycaTable = ({ lyca, isLoading }: LycaTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(lyca: any) => void>(
    (lyca) => {
      if (!lyca) return;
      openModal(LycaModal, { lyca });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('period') }),
      columnHelper.accessor((row) => `${row.usimInfo?.esim_device ?? ''}`, { header: t('model') }),
      columnHelper.accessor((row) => `${row.usimInfo?.esim_eid ?? ''}`, { header: t('eid') }),
      columnHelper.accessor((row) => `${row.usimInfo?.esim_imei ?? ''}`, { header: t('iemi') }),
      columnHelper.accessor((row) => `${row.usimInfo?.att_tmobile_date ?? ''}`, { header: t('activate'), cell: (context: any) => convertDate(context.getValue()!).split(' ')[0] }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: lyca, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default LycaTable;
