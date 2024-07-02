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

        const date = findMetadata(orderMetadata, 'niagara_tour_date')
          || findMetadata(lineItemMetadata, '날짜')
          || findMetadata(orderMetadata, 'niagara_day_bus_tour_date')
          || findMetadata(orderMetadata, 'nicagara_day_date');
        const convertedDate = date ? convertDate(date).split(' ')[0] : '';

        return `${convertedDate}`.trim();
      }, { header: t('schedule') }),
    ],
    [convertDate, t],
  );

  const table = useReactTable({ data: niagara, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleModal(row.original)} />;
};

export default NiagaraTable;
