import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MomaDocentModal } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface MomaDocentTableProps {
  momaDocent: any;
  isLoading?: boolean;
}

const MomaDocentTable = ({ momaDocent, isLoading }: MomaDocentTableProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(momaDocent: any) => void>(
    (momaDocent) => {
      if (!momaDocent) return;
      openModal(MomaDocentModal, { momaDocent });
    },
    [openModal],
  );

  console.log(momaDocent);

  const columns = useMemo(
    () => [
      columnHelper.accessor('order.id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      // columnHelper.accessor((row) => row.lineItem?.metadata?.[0]?.value ?? '', { header: t('type') }),
      columnHelper.accessor('lineItem.quantity', { header: t('quantity') }),
      columnHelper.accessor((row) => {
        const findMetadata = (metadataArray: any[], key: string) => {
          const metadata = metadataArray?.find((meta) => meta.key === key);
          return metadata ? metadata.value : '';
        };

        const orderMetadata = row.order?.metadata;
        const lineItemMetadata = row.lineItem?.metadata;

        const date = findMetadata(orderMetadata, 'docent_tour_met') || findMetadata(orderMetadata, 'docent_tour_met_art') || findMetadata(lineItemMetadata, '날짜');
        const convertedDate = date ? convertDate(date).split(' ')[0] : '';

        const time = findMetadata(orderMetadata, 'met_docent_time') || findMetadata(orderMetadata, 'docent_tour_met_art2') || findMetadata(lineItemMetadata, '시간');

        return `${convertedDate} ${time}`.trim();
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: momaDocent, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default MomaDocentTable;
