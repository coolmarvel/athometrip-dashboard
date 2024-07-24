import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GuggenheimDocentModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface GuggenheimDocentTableProps {
  guggenheimDocent: any;
  isLoading?: boolean;
}

const GuggenheimDocentTable = ({ guggenheimDocent, isLoading }: GuggenheimDocentTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(guggenheimDocent: any) => void>(
    (guggenheimDocent) => {
      if (!guggenheimDocent) return;
      openModal(GuggenheimDocentModal, { guggenheimDocent });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      // columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.lineItem?.metadata?.find((meta: any) => meta.key === '날짜')?.value).split(' ')[0] ?? '';
        const time = row.lineItem?.metadata?.find((meta: any) => meta.key === '시간')?.value ?? '';

        return `${date} ${time}`;
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: guggenheimDocent, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default GuggenheimDocentTable;
