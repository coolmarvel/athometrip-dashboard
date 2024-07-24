import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { Memorial911Modal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface Memorial911TableProps {
  memorial911: any;
  isLoading?: boolean;
}

const Memorial911Table = ({ memorial911, isLoading }: Memorial911TableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(memorial911: any) => void>(
    (memorial911) => {
      if (!memorial911) return;
      openModal(Memorial911Modal, { memorial911 });
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
        const date = convertDate(row.tour?.date_911 ?? row.line_items?.[0]?.meta_data['날짜'] ?? '').split(' ')[0];
        const time = row.tour?.time_911 ?? row.line_items?.[0]?.meta_data['입장 희망시간(1순위)'] ?? '';

        return `${date} ${time}`;
      }, { header: t('schedule(1)') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.tour?.date_911_2 ?? row.line_items?.[0]?.meta_data['날짜'] ?? '').split(' ')[0];
        const time = row.tour?.time_911_2 ?? row.line_items?.[0]?.meta_data['입장 희망시간(2순위)'] ?? '';

        return `${date} ${time}`;
      }, { header: t('schedule(2)') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: memorial911, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default Memorial911Table;
