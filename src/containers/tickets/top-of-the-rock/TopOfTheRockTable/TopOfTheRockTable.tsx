import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Checkbox, Icon, Tag } from '@chakra-ui/react';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { toUrl } from '@/utils';
import { ResponseType } from '@/types';
import { DataTable } from '@/components';
import { useModalStore } from '@/stores';
import { useUpdateTopOfTheRock } from '@/apis';
import { ApiRoutes, statusColor } from '@/constants';
import { useConvertDate, useQueryKeyParams } from '@/hooks';
import { TopOfTheRockDrawer, TopOfTheRockActions } from '@/containers';

const columnHelper = createColumnHelper<any>();

interface TopOfTheRockTableProps {
  topOfTheRock: ResponseType[];
  isLoading?: boolean;
}

const TopOfTheRockTable = ({ topOfTheRock, isLoading }: TopOfTheRockTableProps) => {
  const router = useRouter();
  const convertDate = useConvertDate();
  const { t } = useTranslation();

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.TopOfTheRock));
  const { mutate: updateTopOfTheRock, isLoading: memoLoading, isSuccess } = useUpdateTopOfTheRock(queryKeyParams);

  const { openModal, openConfirm } = useModalStore(['openModal', 'openConfirm']);

  const handleDrawer = useCallback<(topOfTheRock: any) => void>(
    (topOfTheRock) => {
      if (!topOfTheRock) return;
      // @ts-ignore
      openModal(TopOfTheRockDrawer, { topOfTheRock, setMutate: updateTopOfTheRock, isLoading: memoLoading, isSuccess: isSuccess });
    },
    [openModal, isSuccess, memoLoading, updateTopOfTheRock],
  );

  const handleDoubleCheck = useCallback<(id: string, after: string, before: string) => void>((id, after, before) => {
    openConfirm({
      title: t('Double Check'),
      content: t('Are you sure you want to double check this order?'),
      onConfirm: () => updateTopOfTheRock({ id, double_check: true, after, before }),
    });
  }, [updateTopOfTheRock, openConfirm, t]);

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
          <TopOfTheRockActions
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
    ],
    [convertDate, handleDoubleCheck, handleDrawer, router.query, t],
  );

  const table = useReactTable({ data: topOfTheRock, columns, getCoreRowModel: getCoreRowModel() });

  return <DataTable<any> table={table} isLoading={isLoading} />;
};

export default TopOfTheRockTable;
