import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Memorial911Modal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface Memorial911TableProps {
  memorial911: any;
  isLoading?: boolean;
}

const Memorial911Table = ({ memorial911, isLoading }: Memorial911TableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(memorial911: any) => void>(
    (memorial911) => {
      if (!memorial911) return;
      openModal(Memorial911Modal, { memorial911 });
    },
    [openModal]
  );

  console.log(memorial911);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('date'), cell: (context) => convertDate(context.renderValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? 'default', { header: t('type'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.tour?.date_911} ${row.tour?.time_911}`, { header: t('schedule(1)'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.tour?.date_911_2} ${row.tour?.time_911_2}`, { header: t('schedule(2)'), meta: { sortable: true } }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: memorial911, columns, getCoreRowModel: getCoreRowModel() });

  // return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.Memorial911Detail, { id: row.original.order.id }))} />;
  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default Memorial911Table;
