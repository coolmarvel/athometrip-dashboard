import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { WollmanModal } from '../WollmanModal';

const columnHelper = createColumnHelper<any>();

interface WollmanTableProps {
  wollman: any[];
  isLoading?: boolean;
}

const WollmanTable = ({ wollman, isLoading }: WollmanTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(wollman: any) => void>(
    (wollman) => {
      if (!wollman) return;
      openModal(WollmanModal, { wollman });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.line_items?.[0]?.meta_data?.['성인-어린이'] ?? '', { header: t('type') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.tour?.wollman_date ?? row.tour?.wollman_high_date ?? '').split(' ')[0];
        const time = row.tour?.wollman_time ?? '';

        return `${date} ${time}`;
      }, { header: t('schedule(1)') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.tour?.wollman_date ?? row.tour?.wollman_high_date ?? '').split(' ')[0];
        const time = row.tour?.wollman_time_2 ?? '';

        return `${date} ${time}`;
      }, { header: t('schedule(2)') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: wollman, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default WollmanTable;
