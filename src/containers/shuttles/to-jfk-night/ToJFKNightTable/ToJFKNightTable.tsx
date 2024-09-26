import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Checkbox, Icon, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { toUrl } from '@/utils';
import { OrderType } from '@/types';
import { useModalStore } from '@/stores';
import { useUpdateToJFKNight } from '@/apis';
import { ToJFKNightDrawer } from '@/containers';
import { ApiRoutes, statusColor } from '@/constants';
import { DataTable, DataTableActions } from '@/components';
import { useConvertDate, useQueryKeyParams, useSafePush } from '@/hooks';

const columnHelper = createColumnHelper<any>();

interface ToJFkNightTableProps {
  toJFKNight: OrderType[];
  isLoading?: boolean;
}

const ToJFkNightTable = ({ toJFKNight, isLoading }: ToJFkNightTableProps) => {
  const convertDate = useConvertDate();
  const { router } = useSafePush();
  const { t } = useTranslation();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.ToJFKNight));
  const { mutate: updateToJFKNight } = useUpdateToJFKNight(queryKeyParams);

  const { openModal, openConfirm } = useModalStore(['openModal', 'openConfirm']);

  const handleDrawer = useCallback<(toJFKNight: OrderType) => void>(
    (toJFKNight) => {
      if (!toJFKNight) return;
      openModal(ToJFKNightDrawer, { toJFKNight, setMutate: updateToJFKNight });
    },
    [openModal, updateToJFKNight],
  );

  const handleDoubleCheck = useCallback<(id: string, after: string, before: string) => void>(
    (id, after, before) => {
      openConfirm({
        title: t('Double Check'),
        content: t('Are you sure you want to double check this order?'),
        onConfirm: () => updateToJFKNight({ id, double_check: true, after, before }),
      });
    },
    [updateToJFKNight, openConfirm, t],
  );

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
        cell: (context) => <Tag colorScheme={statusColor[context.row.original.order.status] || 'gray'}>{t(context.row.original.order.status)}</Tag>,
      }),
      columnHelper.accessor((row) => row.billing.first_name.toUpperCase(), { header: t('name'), meta: { sortable: true } }),
      columnHelper.accessor('billing.email', { header: t('email'), meta: { sortable: true } }),
      columnHelper.accessor('order.date_created_gmt', { header: t('order date'), cell: (context) => convertDate(context.getValue()!), meta: { sortable: true } }),
      columnHelper.accessor('checked', {
        header: t('checked'),
        cell: (context) => (context.row.original.order.double_checked ? <Icon as={CheckCircleIcon} color={'green.300'} boxSize={'5'} /> : ''),
      }),
      columnHelper.display({
        id: 'actions',
        header: t('actions'),
        cell: (context) => (
          <DataTableActions
            checked={context.row.original.order.double_checked}
            onView={(e) => {
              e.stopPropagation();
              handleDrawer(context.row.original);
            }}
            onUpdate={(e) => {
              e.stopPropagation();
              handleDoubleCheck(context.row.original.order.id, router.query['after'] as string, router.query['before'] as string);
            }}
          />
        ),
      }),
      columnHelper.accessor((row) => convertDate(row.jfk_shuttle_rt?.pickup_date_night ?? row.jfk_oneway?.jfk_shuttle_date2).split(' ')[0] ?? '', { header: t('pickup date') }),
      columnHelper.accessor((row) => row.jfk_shuttle_rt?.night_drop ?? row.jfk_oneway?.jfk_shuttle_stop2 ?? '', { header: t('boarding area') }),
      columnHelper.accessor((row) => row.jfk_shuttle_rt?.flight_num2 ?? '', { header: t('flight number') }),
    ],
    [convertDate, handleDoubleCheck, handleDrawer, router.query, t],
  );

  const table = useReactTable({ data: toJFKNight, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} />;
};

export default ToJFkNightTable;
