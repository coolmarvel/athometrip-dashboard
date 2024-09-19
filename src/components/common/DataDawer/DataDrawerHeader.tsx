import { useTranslation } from 'react-i18next';
import { DrawerCloseButton, DrawerHeader, Flex, Tag } from '@chakra-ui/react';

import { OrderType } from '@/types';
import { statusColor } from '@/constants';

interface DataDrawerHeaderProps {
  data: OrderType;
}

export const DataDrawerHeader = ({ data }: DataDrawerHeaderProps) => {
  const { t } = useTranslation();

  return (
    <>
      <DrawerHeader borderBottomWidth="1px">
        <Flex align="center" gap="4">
          Order #{data?.order?.id ?? t('Order ID')}
          <Tag colorScheme={statusColor[data?.order?.status ?? ''] || 'gray'} fontSize={'x-large'}>
            {data?.order?.status ? t(data.order.status.toUpperCase()) : t('Status')}
          </Tag>
        </Flex>
        <DrawerCloseButton mt={'2'} />
      </DrawerHeader>
    </>
  );
};