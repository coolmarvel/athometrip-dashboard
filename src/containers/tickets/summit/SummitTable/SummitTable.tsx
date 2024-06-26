import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SummitModal } from '../SummitModal';

const columnHelper = createColumnHelper<any>();

interface SummitTableProps {
  summit: any[];
  isLoading?: boolean;
}

const SummitTable = ({ summit, isLoading }: SummitTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(summit: any) => void>(
    (summit) => {
      if (!summit) return;
      openModal(SummitModal, { summit });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
      columnHelper.accessor(
        (row) => {
          const date = row.tour?.date_summit === null ? row.tour?.summit_night_date : row.tour?.date_summit;
          const time = row.tour?.summit_daytime_time === null ? row.tour?.summit_night_time : row.tour?.summit_daytime_time;

          return `${date} ${time}`;
        },
        { header: t('schedule(1)') },
      ),
      columnHelper.accessor(
        (row) => {
          const date = row.tour?.date_summit === null ? row.tour?.summit_night_date : row.tour?.date_summit;
          const time2 = row.tour?.summ_time_2 === null ? row.tour?.summit_night_time : row.tour?.summ_time_2;

          return `${date} ${time2}`;
        },
        { header: t('schedule(2)') },
      ),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: summit, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default SummitTable;
