import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SingleDocentsModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface SingleDocentsTableProps {
  singleDocents: any;
  isLoading?: boolean;
}

const SingleDocentsTable = ({ singleDocents, isLoading }: SingleDocentsTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(singleDocents: any) => void>(
    (singleDocents) => {
      if (!singleDocents) return;
      openModal(SingleDocentsModal, { singleDocents });
    },
    [openModal]
  );

  console.log(singleDocents);

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.product_name, { header: t('product name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.tour_info.tour_kakakoid, { header: t('kakao talk'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.personnel, { header: t('personnel'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => `${convertDate(row.date).split(' ')[0]} ${row.time}`, { header: t('schedule') }),
    ],
    [convertDate, t]
  );

  const data = useMemo(
    () =>
      singleDocents.flatMap((docent: any) =>
        docent.line_items.map((item: any) => ({
          ...docent,
          product_name: item.name,
          personnel: item.meta_data[Object.keys(item.meta_data).find((key) => key.includes('인원')) as string] ?? '',
          date: item.meta_data?.['날짜'] ?? '',
          time: item.meta_data?.['시간'] ?? '',
        }))
      ),
    [singleDocents]
  );
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default SingleDocentsTable;
