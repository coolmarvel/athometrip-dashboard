import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BostonModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface BostonTableProps {
  boston: any;
  isLoading?: boolean;
}

const BostonTable = ({ boston, isLoading }: BostonTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(boston: any) => void>(
    (boston) => {
      if (!boston) return;
      openModal(BostonModal, { boston });
    },
    [openModal],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('tourInfo.tour_kakaoid', { header: t('kakao'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      // columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const findMetadata = (metadataArray: any, key: string) => {
          const metadata = metadataArray?.find((meta: any) => meta.key === key);

          return metadata ? metadata.value : '';
        };

        const orderMetadata = row.order?.metadata;
        const lineItemMetadata = row.lineItem?.metadata;

        const date = findMetadata(orderMetadata, 'boston_tour_date') || findMetadata(lineItemMetadata, '날짜');
        const convertedDate = date ? convertDate(date).split(' ')[0] : '';

        return `${convertedDate}`.trim();
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: boston, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default BostonTable;
