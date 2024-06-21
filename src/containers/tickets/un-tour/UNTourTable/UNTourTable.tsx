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

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor('billing.first_name', { header: t('name(kr)'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor(
        (row) => {
          const enName = row.order.metadata.find((meta: any) => meta.key === 'un_name')?.value.toUpperCase() ?? '';

          return `${enName}`;
        },
        { header: t('name(en)'), meta: { sortable: true } }
      ),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      // columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor(
        (row) => {
          const date = convertDate(row.order.metadata.find((meta: any) => meta.key === 'un_tour_date')?.value).split(' ')[0];

          return `${date}`;
        },
        { header: t('schedule(date)') }
      ),
      columnHelper.accessor(
        (row) => {
          const time = row.order.metadata.find((meta: any) => meta.key === 'un_tour_time3')?.value ?? '';

          return `${time}`;
        },
        { header: t('schedule(time)') }
      ),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
    ],
    [t]
  );

  const table = useReactTable({ data: unTour, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default UNTourTable;
