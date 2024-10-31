import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Checkbox, Icon, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { toUrl } from '@/utils';
import { useModalStore } from '@/stores';
import { useUpdateEllisIsland } from '@/apis';
import { EllisIslandDrawer } from '@/containers';
import { ApiRoutes, statusColor } from '@/constants';
import { DataTable, DataTableActions } from '@/components';
import { useConvertDate, useQueryKeyParams, useSafePush } from '@/hooks';

const columnHelper = createColumnHelper<any>();

interface EllisIslandTableProps {
  ellisIsland: any[];
  isLoading?: boolean;
}

const EllisIslandTable = ({ ellisIsland, isLoading }: EllisIslandTableProps) => {
  const convertDate = useConvertDate();
  const { router } = useSafePush();
  const { t } = useTranslation();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.EllisIsland));
  const { mutate: updateEllisIsland } = useUpdateEllisIsland(queryKeyParams);

  const { openModal, openConfirm } = useModalStore(['openModal', 'openConfirm']);

  const handleDrawer = useCallback<(ellisIsland: any) => void>(
    (ellisIsland) => {
      if (!ellisIsland) return;
      openModal(EllisIslandDrawer, { ellisIsland, setMutate: updateEllisIsland });
    },
    [openModal, updateEllisIsland]
  );

  const handleDoubleCheck = useCallback<(id: string, after: string, before: string) => void>(
    (id, after, before) => {
      openConfirm({
        title: t('Double Check'),
        content: t('Are you sure you want to double check this order?'),
        onConfirm: () => updateEllisIsland({ id, double_check: true, after, before }),
      });
    },
    [updateEllisIsland, openConfirm, t]
  );

  const orderItemDataMap = useMemo(() => {
    return ellisIsland.reduce((acc, order) => {
      const targetItem = order.line_items.find((item: any) => item.order_item_name.includes('엘리스'));
      if (targetItem) {
        acc[order.id] = {
          order_item_id: targetItem.order_item_id,
          double_checked: targetItem.double_checked,
        };
      }
      return acc;
    }, {} as Record<string, { order_item_id: string; double_checked: boolean }>);
  }, [ellisIsland]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('select', {
        id: 'selection',
        header: ({ table }) => <Checkbox isChecked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} aria-label="Select all rows" />,
        cell: ({ row }) => <Checkbox isChecked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} aria-label={`Select row ${row.id}`} />,
      }),
      columnHelper.accessor('id', { header: t('id'), meta: { sortable: true } }),
      columnHelper.accessor('status', {
        header: t('status'),
        cell: (context) => <Tag colorScheme={statusColor[context.row.original.status.split('-')[1]] || 'gray'}>{t(context.row.original.status.split('-')[1])}</Tag>,
      }),
      columnHelper.accessor((row) => row.meta_data._billing_first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor((row) => row.meta_data._billing_email.toLowerCase(), { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('date_created', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor('checked', {
        header: t('checked'),
        cell: (context) => (orderItemDataMap[context.row.original.id].double_checked ? <Icon as={CheckCircleIcon} color={'green.300'} boxSize={'5'} /> : ''),
      }),
      columnHelper.display({
        id: 'actions',
        header: t('actions'),
        cell: (context) => (
          <DataTableActions
            checked={orderItemDataMap[context.row.original.id].double_checked}
            onView={(e) => {
              e.stopPropagation();
              handleDrawer(context.row.original);
            }}
            onUpdate={(e) => {
              e.stopPropagation();
              handleDoubleCheck(orderItemDataMap[context.row.original.id].order_item_id, router.query['after'] as string, router.query['before'] as string);
            }}
          />
        ),
      }),
    ],
    [convertDate, handleDoubleCheck, handleDrawer, router.query, orderItemDataMap, t]
  );

  const table = useReactTable({ data: ellisIsland, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} />;
};

export default EllisIslandTable;
