import { Scheme } from '@/apis';
import { useHasScroll } from '@/hooks';
import { Nullable } from '@/types';
import { Spacer } from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ComponentProps, ComponentType } from 'react';
import VirtualListBase from './VirtualListBase';

interface VirtualListProps<T extends Scheme> {
  container: Nullable<HTMLElement>;
  items: T[];
  renderItem: ComponentType<{ data: T }>;
  onLastItemVisible?: () => void;
  gap?: ComponentProps<typeof Spacer>['h'];
}

const VirtualList = <T extends Scheme>({ container, items, renderItem, onLastItemVisible, gap }: VirtualListProps<T>) => {
  const { hasScroll } = useHasScroll(container);

  return (
    <VirtualListBase
      rowVirtualizer={useVirtualizer({
        count: items.length,
        estimateSize: () => 200,
        getScrollElement: () => container,
      })}
      items={items}
      renderItem={renderItem}
      onLastItemVisible={onLastItemVisible}
      gap={gap}
      hasScroll={hasScroll}
    />
  );
};

export default VirtualList;
