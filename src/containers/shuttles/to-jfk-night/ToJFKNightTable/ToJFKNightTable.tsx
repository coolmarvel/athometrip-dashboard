import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { ToJFKNightModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface ToJFkNightTableProps {
  toJFKNight: any;
  isLoading?: boolean;
}

const ToJFkNightTable = ({ toJFKNight, isLoading }: ToJFkNightTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(toJFKNight: any) => void>(
    (toJFKNight) => {
      if (!toJFKNight) return;
      openModal(ToJFKNightModal, { toJFKNight });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone') }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.jfk_shuttle_rt.kakao_id2 ?? row.order.meta_data.kakao_id2 ?? '', { header: t('kakao talk') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('personnel') }),
      columnHelper.accessor((row) => convertDate(row.jfk_shuttle_rt?.pickup_date_night ?? row.jfk_oneway?.jfk_shuttle_date2).split(' ')[0] ?? '', { header: t('pickup date') }),
      columnHelper.accessor((row) => row.jfk_shuttle_rt?.night_drop ?? row.jfk_oneway?.jfk_shuttle_stop2 ?? '', { header: t('boarding area') }),
      columnHelper.accessor((row) => row.jfk_shuttle_rt?.flight_num2 ?? '', { header: t('flight number') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: toJFKNight, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default ToJFkNightTable;
