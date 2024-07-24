import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { AMNHDocentModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface AMNHDocentTableProps {
  amnhDocent: any;
  isLoading?: boolean;
}

const AMNHDocentTable = ({ amnhDocent, isLoading }: AMNHDocentTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(amnhDocent: any) => void>(
    (amnhDocent) => {
      if (!amnhDocent) return;
      openModal(AMNHDocentModal, { amnhDocent });
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
        const date = convertDate(row.order?.meta_data?.['amnh_docent_date']).split(' ')[0] ?? '';
        const time = row.order?.meta_data?.['anmh_docent_time'] ?? '';

        return `${date} ${time}`;
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: amnhDocent, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default AMNHDocentTable;
