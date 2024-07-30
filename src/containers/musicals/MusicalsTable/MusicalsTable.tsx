import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { MusicalsModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface MusicalsTableProps {
  musicals: any;
  isLoading?: boolean;
}

const MusicalsTable = ({ musicals, isLoading }: MusicalsTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(musicals: any) => void>(
    (musicals) => {
      if (!musicals) return;
      openModal(MusicalsModal, { musicals });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.line_items[0]?.meta_data?.['대표자 여권영문이름'].toUpperCase(), { header: t('en name') }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone') }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.line_items[0]?.name ?? '', { header: t('show name') }),
      columnHelper.accessor((row) => row.line_items[0]?.quantity ?? '', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.line_items[0]?.meta_data?.['날짜']).split(' ')[0] ?? '';
        const time = row.line_items[0]?.meta_data?.['시간'];

        return `${date} ${time}`;
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: musicals, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default MusicalsTable;
