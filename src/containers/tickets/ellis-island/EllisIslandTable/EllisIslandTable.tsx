import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EllisIslandModal } from '../EllisIslandModal';
import { context } from 'esbuild';

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
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor(row => '성인', { header: t('type') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.tour?.ellis_island_date ?? '').split(' ')[0];
        const ellisIslandTime = row.order.meta_data?.['ellis_island_time'];
        const ellisIslandTime2 = row.order.meta_data?.['ellis_island_time2'];

        let time;
        if (ellisIslandTime && ellisIslandTime2) time = `${ellisIslandTime} / ${ellisIslandTime2}`;
        else if (ellisIslandTime) time = ellisIslandTime;
        else if (ellisIslandTime2) time = ellisIslandTime2;
        else time = '';

        return `${date} ${time}`;
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: ellisIsland, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default EllisIslandTable;
