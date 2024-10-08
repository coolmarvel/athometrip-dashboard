import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Post } from '@/apis';
import { toUrl } from '@/utils';
import { DataTable } from '@/components';
import { PageRoutes } from '@/constants';
import { useFormatDate, useSafePush } from '@/hooks';

import PostWriter from './PostWriter';

const columnHelper = createColumnHelper<Post>();

interface PostTableProps {
  posts: Post[];
  isLoading?: boolean;
}

const PostTable = ({ posts, isLoading }: PostTableProps) => {
  const { t } = useTranslation();
  const { push } = useSafePush();
  const { original } = useFormatDate();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t('ID'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('user', {
        header: t('Writer'),
        cell: (context) => <PostWriter writer={context.renderValue()!} />,
        meta: { sortable: true },
      }),
      columnHelper.accessor('title', {
        header: t('Title'),
        meta: { sortable: true },
      }),
      columnHelper.accessor('createdAt', {
        header: t('Created At'),
        cell: (context) => original(context.renderValue()!),
        meta: { sortable: true },
      }),
      columnHelper.accessor('updatedAt', {
        header: t('Updated At'),
        cell: (context) => original(context.renderValue()!),
        meta: { sortable: true },
      }),
    ],
    [original, t],
  );

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable<Post> table={table} isLoading={isLoading} onRowClick={(row) => push(toUrl(PageRoutes.PostDetail, { id: row.original.id }))} />;
};

export default PostTable;
