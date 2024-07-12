import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UNTourModal } from '../UNTourModal';

const columnHelper = createColumnHelper<any>();

interface UNTourTableProps {
  unTour: any[];
  isLoading?: boolean;
}

const UNTourTable = ({ unTour, isLoading }: UNTourTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(unTour: any) => void>(
    (unTour) => {
      if (!unTour) return;
      openModal(UNTourModal, { unTour });
    },
    [openModal]
  );

  console.log(unTour);

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor('billing.first_name', { header: t('name(kr)'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.order.meta_data?.['un_name']?.toUpperCase() ?? '', { header: t('name(en)'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('quantity') }),
      columnHelper.accessor((row) => convertDate(row.order.meta_data?.['un_tour_date']).split(' ')[0], { header: t('schedule(date)') }),
      columnHelper.accessor((row) => row.order.meta_data?.['un_tour_time3'] ?? '', { header: t('schedule(time)') }),
    ],
    [convertDate, t]
  );

  const table = useReactTable({ data: unTour, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default UNTourTable;
