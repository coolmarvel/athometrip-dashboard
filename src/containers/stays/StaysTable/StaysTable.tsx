import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { StaysModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface StaysTableProps {
  stays: any;
  isLoading?: boolean;
}

const StaysTable = ({ stays, isLoading }: StaysTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(stays: any) => void>(
    (stays) => {
      if (!stays) return;
      openModal(StaysModal, { stays });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone') }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.line_items[0]?.name, { header: t('product') }),
      columnHelper.accessor((row) => row.line_items[0]?.meta_data[Object.keys(row.line_items[0]?.meta_data).find((key) => key.includes('인원')) as string] ?? '', {
        header: t('personnel'), meta: { sortable: true },
      }),
      columnHelper.accessor((row) => row.line_items[0]?.total ?? '', { header: t('payment amount') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.meta_data?._full_amount ?? '', { header: t('full amount') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: stays, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default StaysTable;
