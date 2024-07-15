import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { H2OEsimModal } from '..';

const columnHelper = createColumnHelper<any>();

interface H2OEsimTableProps {
  h2oEsim: any;
  isLoading?: boolean;
}

const H2OEsimTable = ({ h2oEsim, isLoading }: H2OEsimTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(h2oEsim: any) => void>(
    (h2oEsim) => {
      if (!h2oEsim) return;
      openModal(H2OEsimModal, { h2oEsim });
    },
    [openModal],
  );

  const columns = useMemo(
      () => [
        columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
        columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
        columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
        columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
        columnHelper.accessor((row) => row.line_items?.[0]?.quantity ?? '', { header: t('quantity') }),
        columnHelper.accessor((row) => `${(row.line_items?.[0]?.meta_data?.['상품-옵션']).match(/\d+/)[0]}일`, { header: t('period') }),
        columnHelper.accessor((row) => `${row.usim_info?.esim_device ?? ''}`, { header: t('model') }),
        columnHelper.accessor((row) => `${row.usim_info?.esim_eid ?? ''}`, { header: t('eid') }),
        columnHelper.accessor((row) => `${row.usim_info?.esim_imei ?? ''}`, { header: t('iemi') }),
        columnHelper.accessor((row) => `${row.usim_info?.att_tmobile_date ?? ''}`, { header: t('activate'), cell: (context: any) => convertDate(context.getValue()!).split(' ')[0] }),
      ],
      [convertDate, t],
    )
  ;

  const table = useReactTable({ data: h2oEsim, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default H2OEsimTable;
