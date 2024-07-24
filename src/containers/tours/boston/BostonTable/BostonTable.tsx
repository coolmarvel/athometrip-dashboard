import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BostonModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface BostonTableProps {
  boston: any;
  isLoading?: boolean;
}

const BostonTable = ({ boston, isLoading }: BostonTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(boston: any) => void>(
    (boston) => {
      if (!boston) return;
      openModal(BostonModal, { boston });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('tour_info.tour_kakakoid', { header: t('kakao talk'), meta: { sortable: true } }),
      columnHelper.accessor('billing.phone', { header: t('phone') }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      // columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.order?.meta_data?.['boston_tour_date'] ?? row.line_items[0].meta_data['날짜']).split(' ')[0] ?? '';

        return `${date}`;
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: boston, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default BostonTable;
