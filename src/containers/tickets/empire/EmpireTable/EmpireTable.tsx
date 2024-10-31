import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Checkbox, Icon, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { toUrl } from '@/utils';
import { useModalStore } from '@/stores';
import { useUpdateEmpire } from '@/apis';
import { EmpireDrawer } from '@/containers';
import { ApiRoutes, statusColor } from '@/constants';
import { DataTable, DataTableActions } from '@/components';
import { useConvertDate, useQueryKeyParams, useSafePush } from '@/hooks';

const columnHelper = createColumnHelper<any>();

interface EmpireTableProps {
  empire: any[];
  isLoading?: boolean;
}

const EmpireTable = ({ empire, isLoading }: EmpireTableProps) => {
  const convertDate = useConvertDate();
  const { router } = useSafePush();
  const { t } = useTranslation();

  const { openModal, openConfirm } = useModalStore(['openModal', 'openConfirm']);

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Empire));
  const { mutate: updateEmpire } = useUpdateEmpire(queryKeyParams);

  const handleDrawer = useCallback<(empire: any) => void>(
    (empire) => {
      if (!empire) return;
      openModal(EmpireDrawer, { empire, setMutate: updateEmpire });
    },
    [openModal, updateEmpire]
  );

  const handleDoubleCheck = useCallback<(id: string, after: string, before: string) => void>(
    (id, after, before) => {
      openConfirm({
        title: t('Double Check'),
        content: t('Are you sure you want to double check this order?'),
        onConfirm: () => updateEmpire({ id, double_check: true, after, before }),
      });
    },
    [updateEmpire, openConfirm, t]
  );

  const orderItemDataMap = useMemo(() => {
    return empire.reduce((acc, order) => {
      const targetItem = order.line_items.find((item: any) => item.order_item_name.includes('엠파이어'));
      if (targetItem) {
        acc[order.id] = {
          order_item_id: targetItem.order_item_id,
          double_checked: targetItem.double_checked,
        };
      }
      return acc;
    }, {} as Record<string, { order_item_id: string; double_checked: boolean }>);
  }, [empire]);

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

  const table = useReactTable({ data: empire, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} />;
};

export default EmpireTable;
