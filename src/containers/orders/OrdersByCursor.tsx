import { Post, useGetOrdersByCursor } from '@/apis';
import { InfiniteList } from '@/components';
import { usePagination } from '@/hooks';
import { OrderListItem } from '.';
import { QueryParser } from '@/utils';
import { useRouter } from 'next/router';

interface OrdersByCursorProps {
  usesObserver?: boolean;
}

const OrdersByCursor = ({ usesObserver }: OrdersByCursorProps) => {
  const router = useRouter();
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<Post>
      infiniteQuery={useGetOrdersByCursor({
        limit,
        sort,
        order,
        search: QueryParser.toString(router.query.search) ?? '',
      })}
      renderItem={OrderListItem}
      usesObserver={usesObserver}
    />
  );
};

export default OrdersByCursor;
