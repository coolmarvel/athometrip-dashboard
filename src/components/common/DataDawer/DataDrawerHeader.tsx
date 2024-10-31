import { useTranslation } from 'react-i18next';
import { DrawerCloseButton, DrawerHeader, Flex, Tag } from '@chakra-ui/react';

import { statusColor } from '@/constants';

interface DataDrawerHeaderProps {
  data: any;
}

export const DataDrawerHeader = ({ data }: DataDrawerHeaderProps) => {
  const { t } = useTranslation();

  return (
    <>
      <DrawerHeader borderBottomWidth="1px">
        <Flex align="center" gap="4">
          Order #{data?.id ?? t('Order ID')}
          <Tag colorScheme={statusColor[data.status.split('-')[1] ?? ''] || 'gray'} fontSize={'x-large'}>
            {data?.status ? t(data.status.split('-')[1].toUpperCase()) : t('Status')}
          </Tag>
        </Flex>
        <DrawerCloseButton mt={'2'} />
      </DrawerHeader>
    </>
  );
};
