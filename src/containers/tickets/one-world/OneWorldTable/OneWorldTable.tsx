import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { OneWorldModal } from '../OneWorldModal';

const columnHelper = createColumnHelper<any>();

interface OneWorldTableProps {
  oneWorld: any[];
  isLoading?: boolean;
}

const OneWorldTable = ({ oneWorld, isLoading }: OneWorldTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(oneWorld: any) => void>(
    (oneWorld) => {
      if (!oneWorld) return;
      openModal(OneWorldModal, { oneWorld });
    },
    [openModal]
  );

  console.log(oneWorld);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('date'), cell: (context) => convertDate(context.renderValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? 'default', { header: t('type'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.tour?.oneworld_date} ${row.tour?.oneworld_time}`, { header: t('schedule'), meta: { sortable: true } }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: oneWorld, columns, getCoreRowModel: getCoreRowModel() });

  // return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.OneWorldDetail, { id: row.original.order.id }))} />;
  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default OneWorldTable;
