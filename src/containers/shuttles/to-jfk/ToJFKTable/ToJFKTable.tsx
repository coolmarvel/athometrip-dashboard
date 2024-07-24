import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { ToJFKModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface ToJFkTableProps {
  toJFK: any;
  isLoading?: boolean;
}

const ToJFkTable = ({ toJFK, isLoading }: ToJFkTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(toJFK: any) => void>(
    (toJFK) => {
      if (!toJFK) return;
      openModal(ToJFKModal, { toJFK });
    },
    [openModal]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone') }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.jfk_shuttle_rt.kakao_id2 ?? row.order.meta_data.kakao_id2 ?? '', { header: t('kakao talk') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('personnel') }),
      columnHelper.accessor(
        (row) => {
          return convertDate(row.jfk_shuttle_rt?.pickup_date_30 ?? row.jfk_oneway?.pickup_date_10 ?? row.jfk_shuttle_rt?.pickup_date_fromnj).split(' ')[0] ?? '';
        },
        { header: t('pickup date') }
      ),
      columnHelper.accessor(
        (row) => {
          return row.jfk_shuttle_rt?.drop_add_2 ?? row.jfk_oneway?.drop_add ?? row.jfk_shuttle_rt?.jfk_shuttle_pickup_nj ?? '';
        },
        { header: t('boarding area') }
      ),
      columnHelper.accessor((row) => row.jfk_shuttle_rt?.flight_num2 ?? row.jfk_oneway?.fligh_num ?? '', { header: t('flight number') }),
    ],
    [convertDate, t]
  );

  const table = useReactTable({ data: toJFK, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default ToJFkTable;
