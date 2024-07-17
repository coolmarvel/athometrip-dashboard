import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NiagaraTwoDaysModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface NiagaraTwoDaysTableProps {
  niagaraTwoDays: any;
  isLoading?: boolean;
}

const NiagaraTwoDaysTable = ({ niagaraTwoDays, isLoading }: NiagaraTwoDaysTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(niagaraTwoDays: any) => void>(
    (niagaraTwoDays) => {
      if (!niagaraTwoDays) return;
      openModal(NiagaraTwoDaysModal, { niagaraTwoDays });
    },
    [openModal],
  );
  console.log(niagaraTwoDays);

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('tour_info.tour_kakakoid', { header: t('kakao talk'), meta: { sortable: true } }),
      columnHelper.accessor('billing.phone', { header: t('phone') }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.order.meta_data?.['niagara_tour_date'] ?? row.line_items[0].meta_data?.['날짜'] ?? '').split(' ')[0];

        return `${date}`;
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: niagaraTwoDays, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default NiagaraTwoDaysTable;
