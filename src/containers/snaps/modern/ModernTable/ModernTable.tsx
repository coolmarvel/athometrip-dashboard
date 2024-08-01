import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { ModernModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface ModernTableProps {
  modern: any;
  isLoading?: boolean;
}

const ModernTable = ({ modern, isLoading }: ModernTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(modern: any) => void>(
    (modern) => {
      if (!modern) return;
      openModal(ModernModal, { modern });
    },
    [openModal],
  );

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
      columnHelper.accessor((row) => {
        return Number(row.line_items?.[0]?.meta_data?._full_amount) - Number(row.line_items[0]?.subtotal) ?? '';
      }, { header: t('on-site payment') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: modern, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default ModernTable;
