import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Checkbox, Icon, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { toUrl } from '@/utils';
import { OrderType } from '@/types';
import { useModalStore } from '@/stores';
import { useUpdateToNYNight } from '@/apis';
import { ToNYNightDrawer } from '@/containers';
import { ApiRoutes, statusColor } from '@/constants';
import { DataTable, DataTableActions } from '@/components';
import { useConvertDate, useQueryKeyParams, useSafePush } from '@/hooks';

const columnHelper = createColumnHelper<any>();

interface ToNYNightTableProps {
  toNYNight: OrderType[];
  isLoading?: boolean;
}

const ToNYNightTable = ({ toNYNight, isLoading }: ToNYNightTableProps) => {
  const convertDate = useConvertDate();
  const { router } = useSafePush();
  const { t } = useTranslation();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.ToNYNight));
  const { mutate: updateToNYNight } = useUpdateToNYNight(queryKeyParams);

  const { openModal, openConfirm } = useModalStore(['openModal', 'openConfirm']);

  const handleDrawer = useCallback<(toNYNight: OrderType) => void>(
    (toNYNight) => {
      if (!toNYNight) return;
      openModal(ToNYNightDrawer, { toNYNight, setMutate: updateToNYNight });
    },
    [openModal, updateToNYNight],
  );

  const handleDoubleCheck = useCallback<(id: string, after: string, before: string) => void>(
    (id, after, before) => {
      openConfirm({
        title: t('Double Check'),
        content: t('Are you sure you want to double check this order?'),
        onConfirm: () => updateToNYNight({ id, double_check: true, after, before }),
      });
    },
    [updateToNYNight, openConfirm, t],
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
      columnHelper.accessor((row) => convertDate(row.jfk_oneway?.jfk_shuttle_date2 ?? row.jfk_oneway?.pickup_date_to_nj).split(' ')[0] ?? '', { header: t('pickup date') }),
      columnHelper.accessor((row) => row.jfk_oneway?.jfk_shuttle_stop2 ?? row.jfk_oneway?.jfk_stop_nj ?? '', { header: t('boarding area') }),
      columnHelper.accessor((row) => row.jfk_oneway?.flight_num ?? row.jfk_shuttle_rt?.flight_num2 ?? '', { header: t('flight number') }),
    ],
    [convertDate, handleDoubleCheck, handleDrawer, router.query, t],
  );
  console.log(toNYNight);

  const table = useReactTable({ data: toNYNight, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} />;
};

export default ToNYNightTable;
