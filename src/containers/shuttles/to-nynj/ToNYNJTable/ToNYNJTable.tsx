import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { ToNYNJModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface ToNYNJTableProps {
  toNYNJ: any;
  isLoading?: boolean;
}

const ToNYNJTable = ({ toNYNJ, isLoading }: ToNYNJTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(toNYNJ: any) => void>(
    (toNYNJ) => {
      if (!toNYNJ) return;
      openModal(ToNYNJModal, { toNYNJ });
    },
    [openModal]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone') }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.jfk_oneway.kakao_id1 ?? row.order.meta_data.kakao_id1 ?? '', { header: t('kakao talk') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('personnel') }),
      columnHelper.accessor((row) => convertDate(row.jfk_oneway?.pickup_date_10 ?? row.jfk_oneway?.pickup_date_to_nj).split(' ')[0] ?? '', { header: t('pickup date') }),
      columnHelper.accessor((row) => row.jfk_oneway?.drop_add ?? row.jfk_oneway?.jfk_stop_nj ?? '', { header: t('boarding area') }),
      columnHelper.accessor((row) => row.jfk_oneway?.flight_num ?? row.jfk_shuttle_rt?.flight_num2 ?? '', { header: t('flight number') }),
    ],
    [convertDate, t]
  );

  const table = useReactTable({ data: toNYNJ, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default ToNYNJTable;
