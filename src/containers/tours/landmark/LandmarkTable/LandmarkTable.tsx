import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LandmarkModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface LandmarkTableProps {
  landmark: any;
  isLoading?: boolean;
}

const LandmarkTable = ({ landmark, isLoading }: LandmarkTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(landmark: any) => void>(
    (landmark) => {
      if (!landmark) return;
      openModal(LandmarkModal, { landmark });
    },
    [openModal]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.email.toLowerCase(), { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('tour_info.tour_kakakoid', { header: t('kakao talk'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('quantity') }),
      columnHelper.accessor(
        (row) => {
          const date = convertDate(row.line_items?.[0]?.meta_data['날짜'] ?? '').split(' ')[0];
          const time = row.line_items?.[0]?.meta_data['시간'] ?? '';

          return `${date} ${time}`;
        },
        { header: t('schedule') }
      ),
    ],
    [convertDate, t]
  );

  const table = useReactTable({ data: landmark, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default LandmarkTable;
