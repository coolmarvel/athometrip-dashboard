import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MLBMetsModal } from '../MLBMetsModal';

const columnHelper = createColumnHelper<any>();

interface MLBMetsTableProps {
  mlbMets: any[];
  isLoading?: boolean;
}

const MLBMetsTable = ({ mlbMets, isLoading }: MLBMetsTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(mlbMets: any) => void>(
    (mlbMets) => {
      if (!mlbMets) return;
      openModal(MLBMetsModal, { mlbMets });
    },
    [openModal]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!) }),
      // columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor(
        (row) => {
          const date = convertDate(row.order.metadata.find((meta: any) => meta.key === 'yankees_off_date')?.value).split(' ')[0] ?? '';
          const time = row.order.metadata.find((meta: any) => meta.key === 'yankees_off_time')?.value ?? '';

          return `${date} ${time}`;
        },
        { header: t('schedule') }
      ),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
    ],
    [t]
  );

  const table = useReactTable({ data: mlbMets, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default MLBMetsTable;
