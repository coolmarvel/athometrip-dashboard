import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';


import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface ToJFKNightCardProps {
  data?: any;
}

const ToJFKNightCard = ({ data: toJFKNight }: ToJFKNightCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toJFKNight?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toJFKNight?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toJFKNight?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toJFKNight?.payment?.payment_method_title ?? 'Payment method'} (${toJFKNight?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toJFKNight, t],
  );

  const columns = useMemo(() => [{
    name: toJFKNight?.line_items[0].name ?? '',
    quantity: toJFKNight?.line_items[0].quantity ?? '',
    total: toJFKNight?.line_items[0].total ?? '',
  }], [toJFKNight]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!toJFKNight}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{toJFKNight?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[toJFKNight?.order.status] || 'gray'} fontSize={'x-large'}>
              {toJFKNight?.order.status ? t(toJFKNight.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!toJFKNight}>
              </Skeleton>
            ))}
          </Stack>
        </Box>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>{t('Product')}</Th>
              <Th isNumeric>{t('Quantity')}</Th>
              <Th isNumeric>{t('Total')}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {columns.map((product: any, idx: any) => (
              <Tr key={idx}>
                <Td>{product.name}</Td>
                <Td isNumeric>{product.quantity}</Td>
                <Td isNumeric>${product.total}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ToJFKNightCard;
