import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { toUrl } from '@/utils';
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
  const { push } = useSafePush();
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
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor('billing.first_name', { header: t('name(kr)'), meta: { sortable: true } }),
      columnHelper.accessor(
        (row) => {
          const enName = row.order.metadata.find((meta: any) => meta.key === 'un_name')?.value.toUpperCase() ?? '';

          return `${enName}`;
        },
        { header: t('name(en)'), meta: { sortable: true } }
      ),
      columnHelper.accessor('order.date_created', { header: t('date'), cell: (context) => convertDate(context.renderValue()!), meta: { sortable: true } }),
      // columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? 'default', { header: t('type'), meta: { sortable: true } }),
      columnHelper.accessor(
        (row) => {
          const date = convertDate(row.order.metadata.find((meta: any) => meta.key === 'un_tour_date')?.value).split(' ')[0];

          return `${date}`;
        },
        { header: t('schedule(date)'), meta: { sortable: true } }
      ),
      columnHelper.accessor(
        (row) => {
          const time = row.order.metadata.find((meta: any) => meta.key === 'un_tour_time3')?.value ?? '';

          return `${time}`;
        },
        { header: t('schedule(time)'), meta: { sortable: true } }
      ),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: unTour, columns, getCoreRowModel: getCoreRowModel() });

  // return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.UNTourDetail, { id: row.original.order.id }))} />;
  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default UNTourTable;
