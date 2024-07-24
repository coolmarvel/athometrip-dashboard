import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { WoodburyModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface WoodburyTableProps {
  woodbury: any;
  isLoading?: boolean;
}

const WoodburyTable = ({ woodbury, isLoading }: WoodburyTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(woodbury: any) => void>(
    (woodbury) => {
      if (!woodbury) return;
      openModal(WoodburyModal, { woodbury });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('quantity') }),
      columnHelper.accessor((row) => convertDate(row.line_items[0].meta_data?.['날짜'] ?? '').split(' ')[0], { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: woodbury, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default WoodburyTable;
