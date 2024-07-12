import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TMobileModal } from '../TMobileModal';

const columnHelper = createColumnHelper<any>();

interface TMobileUsimTableProps {
  tMobile: any;
  isLoading?: boolean;
}

const TMobileUsimTable = ({ tMobile, isLoading }: TMobileUsimTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(tMobile: any) => void>(
    (tMobile) => {
      if (!tMobile) return;
      openModal(TMobileModal, { tMobile });
    },
    [openModal],
  );

  const columns = useMemo(
      () => [
        columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
        columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
        columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
        columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
        columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
        columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('period') }),
        columnHelper.accessor((row) => `${row.usimInfo?.esim_device ?? ''}`, { header: t('model') }),
        columnHelper.accessor((row) => `${row.usimInfo?.att_tmobile_date ?? ''}`, { header: t('activate'), cell: (context: any) => convertDate(context.getValue()!).split(' ')[0] }),
      ],
      [convertDate, t],
    )
  ;

  const table = useReactTable({ data: tMobile, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default TMobileUsimTable;
