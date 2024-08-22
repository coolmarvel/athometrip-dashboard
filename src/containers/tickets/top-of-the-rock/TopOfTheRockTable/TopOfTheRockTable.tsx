import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { Checkbox, Icon, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { ResponseType } from '@/types';
import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useConvertDate } from '@/hooks';
import { statusColor } from '@/constants';
import { TopOfTheRockDrawer, TopOfTheRockActions } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface TopOfTheRockTableProps {
  topOfTheRock: ResponseType[];
  isLoading?: boolean;
}

const TopOfTheRockTable = ({ topOfTheRock, isLoading }: TopOfTheRockTableProps) => {
  const convertDate = useConvertDate();
  const { t } = useTranslation();

  const { openModal } = useModalStore(['openModal']);

  const handleDrawer = useCallback<(topOfTheRock: any) => void>((topOfTheRock) => {
    if (!topOfTheRock) return;
    openModal(TopOfTheRockDrawer, { topOfTheRock });
  }, [openModal]);

  const columns = useMemo(
      () => [
        columnHelper.accessor('select', {
          id: 'selection',
          header: ({ table }) => (
            <Checkbox
              isChecked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
              aria-label="Select all rows"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              isChecked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              aria-label={`Select row ${row.id}`}
            />
          ),
        }),
        columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
        columnHelper.accessor('status', {
          header: t('status'),
          cell: (context) => (
            <Tag colorScheme={statusColor[context.row.original.order.status] || 'gray'}>{t(context.row.original.order.status)}</Tag>
          ),
        }),
        columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
        columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
        columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
        columnHelper.accessor('checked', {
          header: t('checked'),
          cell: (context) => <Icon as={RiCheckDoubleFill} color={'red'} boxSize={'5'} />,
        }),
        columnHelper.display({
          id: 'actions', header: t('actions'), cell: (context) => (
            <TopOfTheRockActions onView={(e) => {
              e.stopPropagation();
              handleDrawer(context.row.original);
            }} />
          ),
        }),
      ],
      [convertDate, handleDrawer, t],
    )
  ;
  console.log(topOfTheRock);

  const table = useReactTable({ data: topOfTheRock, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} />;

};

export default TopOfTheRockTable;
