import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { ToNYNJEWRModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface ToNYNJEWRTableProps {
  toNYNJEWR: any;
  isLoading?: boolean;
}

const ToNYNJEWRTable = ({ toNYNJEWR, isLoading }: ToNYNJEWRTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(toNYNJEWR: any) => void>(
    (toNYNJEWR) => {
      if (!toNYNJEWR) return;
      openModal(ToNYNJEWRModal, { toNYNJEWR });
    },
    [openModal]
  );
  console.log(toNYNJEWR);

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone') }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.jfk_oneway.kakao_id1 ?? row.jfk_shuttle_rt.kakao_id2 ?? '', { header: t('kakao talk') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('personnel') }),
      columnHelper.accessor((row) => convertDate(row.jfk_oneway?.ewr_depart_date).split(' ')[0] ?? '', { header: t('pickup date') }),
      columnHelper.accessor((row) => row.jfk_oneway?.ewr_stop ?? '', { header: t('boarding area') }),
      columnHelper.accessor((row) => row.jfk_oneway?.ewr_flight_num ?? '', { header: t('flight number') }),
    ],
    [convertDate, t]
  );

  const table = useReactTable({ data: toNYNJEWR, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default ToNYNJEWRTable;
