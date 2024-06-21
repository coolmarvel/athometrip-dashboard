import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EllisIslandModal } from '../EllisIslandModal';

const columnHelper = createColumnHelper<any>();

interface EllisIslandTableProps {
  ellisIsland: any[];
  isLoading?: boolean;
}

const EllisIslandTable = ({ ellisIsland, isLoading }: EllisIslandTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(ellisIsland: any) => void>(
    (ellisIsland) => {
      if (!ellisIsland) return;
      openModal(EllisIslandModal, { ellisIsland });
    },
    [openModal]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor('', { header: t('type') }),
      columnHelper.accessor((row) => `${row.tour?.ellis_island_date}`, { header: t('schedule(date)') }),
      columnHelper.accessor(
        (row) => {
          const ellisIslandTime = row.order.metadata.find((meta: any) => meta.key === 'ellis_island_time')?.value;
          const ellisIslandTime2 = row.order.metadata.find((meta: any) => meta.key === 'ellis_island_time2')?.value;

          let schedule = '';
          if (ellisIslandTime && ellisIslandTime2) schedule = `${ellisIslandTime} / ${ellisIslandTime2}`;
          else if (ellisIslandTime) schedule = ellisIslandTime;
          else if (ellisIslandTime2) schedule = ellisIslandTime2;

          return schedule;
        },
        { header: t('schedule(time)') }
      ),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
    ],
    [t]
  );

  const table = useReactTable({ data: ellisIsland, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default EllisIslandTable;
