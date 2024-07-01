import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NiagaraModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface NiagaraTableProps {
  niagara: any;
  isLoading?: boolean;
}

const NiagaraTable = ({ niagara, isLoading }: NiagaraTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(niagara: any) => void>(
    (niagara) => {
      if (!niagara) return;
      openModal(NiagaraModal, { niagara });
    },
    [openModal],
  );

  console.log(niagara);

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.order?.metadata?.find((meta: any) => meta.key === 'amnh_docent_date')?.value).split(' ')[0] ?? '';
        const time = row.order?.metadata?.find((meta: any) => meta.key === 'anmh_docent_time')?.value ?? '';

        return `${date} ${time}`;
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: niagara, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default NiagaraTable;
