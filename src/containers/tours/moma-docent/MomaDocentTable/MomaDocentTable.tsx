import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MomaDocentModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface MomaDocentTableProps {
  momaDocent: any;
  isLoading?: boolean;
}

const MomaDocentTable = ({ momaDocent, isLoading }: MomaDocentTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(momaDocent: any) => void>(
    (momaDocent) => {
      if (!momaDocent) return;
      openModal(MomaDocentModal, { momaDocent });
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
      columnHelper.accessor(
        (row) => {
          const date = convertDate(row.order.meta_data?.['docent_tour_moma'] ?? row.line_items[0].meta_data?.['날짜'] ?? '').split(' ')[0];
          const time = row.order.meta_data?.['moma_docent_time'] ?? row.line_items[0].meta_data?.['시간'] ?? '';

          return `${date} ${time}`;
        },
        { header: t('schedule') },
      ),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: momaDocent, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default MomaDocentTable;
