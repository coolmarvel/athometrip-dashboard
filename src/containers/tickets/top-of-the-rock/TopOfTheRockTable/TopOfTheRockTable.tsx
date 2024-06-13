import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush, useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { toUrl } from '@/utils';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TopOfTheRockModal } from '../TopOfTheRockModal';

const columnHelper = createColumnHelper<any>();

interface TopOfTheRockTableProps {
  topOfTheRock: any[];
  isLoading?: boolean;
}

const TopOfTheRockTable = ({ topOfTheRock, isLoading }: TopOfTheRockTableProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(topOfTheRock: any) => void>(
    (topOfTheRock) => {
      if (!topOfTheRock) return;
      openModal(TopOfTheRockModal, { topOfTheRock });
    },
    [openModal]
  );

  console.log(topOfTheRock);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor('billing.first_name', { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('date'), cell: (context) => convertDate(context.renderValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? 'default', { header: t('type'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.tour?.top_date} ${row.tour?.top_sunset}`, { header: t('schedule(1)'), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${row.tour?.top_date} ${row.tour?.tor_time_2}`, { header: t('schedule(2)'), meta: { sortable: true } }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
    ],
    [t]
  );

  const table = useReactTable({ data: topOfTheRock, columns, getCoreRowModel: getCoreRowModel() });

  // return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.TopOfTheRockDetail, { id: row.original.order.id }))} />;
  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default TopOfTheRockTable;
