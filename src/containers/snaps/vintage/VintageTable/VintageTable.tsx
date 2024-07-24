import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { VintageModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface VintageTableProps {
  vintage: any;
  isLoading?: boolean;
}

const VintageTable = ({ vintage, isLoading }: VintageTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(vintage: any) => void>(
    (vintage) => {
      if (!vintage) return;
      openModal(VintageModal, { vintage });
    },
    [openModal],
  );
  console.log(vintage);

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.phone, { header: t('phone') }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.snap_info.mobile_snap ?? '', { header: t('kakao talk') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.line_items[0]?.meta_data?.['날짜']).split(' ')[0] ?? '';
        const time = row.line_items[0]?.meta_data?.['촬영 시작 희망시간 (1순위)'];

        return `${date} ${time}`;
      }, { header: t('schedule(1)') }),
      columnHelper.accessor((row) => {
        const date = convertDate(row.line_items[0]?.meta_data?.['날짜']).split(' ')[0] ?? '';
        const time = row.line_items[0]?.meta_data?.['촬영 시작 희망시간 (2순위)'];

        return `${date} ${time}`;
      }, { header: t('schedule(2)') }),
      columnHelper.accessor((row) => row.line_items[0]?.meta_data[Object.keys(row.line_items[0]?.meta_data).find((key) => key.includes('인원')) as string] ?? '', {
        header: t('personnel'), meta: { sortable: true },
      }),
      columnHelper.accessor((row) => row.line_items?.[0]?.meta_data?.['홍보 목적 사용 동의'] ?? '', { header: t('marketing opt-in') }),
      columnHelper.accessor((row) => row.line_items[0]?.meta_data[Object.keys(row.line_items[0]?.meta_data).find((key) => key.includes('필름추가')) as string] ?? '', {
        header: t('addition film'), meta: { sortable: true },
      }),
      columnHelper.accessor((row) => {
        const a = Number(row.line_items?.[0]?.meta_data?._full_amount ?? '0');
        const b = Number(row.line_items[0]?.subtotal);

        return a - b < 0 ? 0 : a - b;
      }, { header: t('on-site payment') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: vintage, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default VintageTable;
