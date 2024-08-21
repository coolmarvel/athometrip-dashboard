import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Checkbox, Tag, useDisclosure } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { DataTable } from '@/components';
import { useConvertDate } from '@/hooks';
import { useModalStore } from '@/stores';
import { TopOfTheRockModal, TopOfTheRockDrawer, TopOfTheRockActions } from '@/containers';
import { context } from 'esbuild';

const columnHelper = createColumnHelper<any>();

interface TopOfTheRockTableProps {
  topOfTheRock: any[];
  isLoading?: boolean;
}

const TopOfTheRockTable = ({ topOfTheRock, isLoading }: TopOfTheRockTableProps) => {
  const convertDate = useConvertDate();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { openModal } = useModalStore(['openModal']);

  const handleModal = useCallback<(topOfTheRock: any) => void>(
    (topOfTheRock) => {
      if (!topOfTheRock) return;
      openModal(TopOfTheRockModal, { topOfTheRock });
    },
    [openModal],
  );

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
        header: t('status'), cell: (context) => (
          <Tag colorScheme='green'>{context.row.original.order.status}</Tag>
        ),
      }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.display({
        id: 'actions', header: t('actions'), cell: (context) => (
          <TopOfTheRockActions onView={(e) => {
            e.stopPropagation();
            handleDrawer(context.row.original);
          }} />
        ),
      }),
    ],
    [convertDate, t],
  );
  console.log(topOfTheRock);

  const table = useReactTable({ data: topOfTheRock, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} onRowClick={(row) => handleDrawer(row.original)} />;

};

export default TopOfTheRockTable;
