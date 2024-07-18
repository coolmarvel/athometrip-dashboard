import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { ToEWRModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface ToEWRTableProps {
  toEWR: any;
  isLoading?: boolean;
}

const ToEWRTable = ({ toEWR, isLoading }: ToEWRTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(toEWR: any) => void>(
    (toEWR) => {
      if (!toEWR) return;
      openModal(ToEWRModal, { toEWR });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone') }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.tour_info.tour_kakakoid ?? row.order.meta_data.kakao_id2 ?? '', { header: t('kakao talk') }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('personnel') }),
      columnHelper.accessor((row) => convertDate(row.jfk_shuttle_rt?.ewr_arrive_date).split(' ')[0] ?? '', { header: t('pickup date') }),
      columnHelper.accessor((row) => row.jfk_shuttle_rt?.ewr_pickup ?? '', { header: t('boarding area') }),
      columnHelper.accessor((row) => row.jfk_shuttle_rt?.ewr_flght_num2 ?? '', { header: t('flight number') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: toEWR, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default ToEWRTable;
