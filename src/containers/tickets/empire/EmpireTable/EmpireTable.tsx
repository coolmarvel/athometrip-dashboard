import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EmpireModal } from '../EmpireModal';

const columnHelper = createColumnHelper<any>();

interface EmpireTableProps {
  empire: any[];
  isLoading?: boolean;
}

const EmpireTable = ({ empire, isLoading }: EmpireTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(empire: any) => void>(
    (empire) => {
      if (!empire) return;
      openModal(EmpireModal, { empire });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!) }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
      columnHelper.accessor(
        (row) => {
          const date = row.tour?.empire_date;
          const time = row.tour?.empire_time;

          return `${date} ${time}`;
        },
        { header: t('schedule') },
      ),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: empire, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default EmpireTable;
