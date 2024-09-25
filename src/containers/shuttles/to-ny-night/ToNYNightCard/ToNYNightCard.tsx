import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';


import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface ToNYNightCardProps {
  data?: any;
}

const ToNYNightCard = ({ data: toNYNight }: ToNYNightCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toNYNight?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toNYNight?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toNYNight?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toNYNight?.payment?.payment_method_title ?? 'Payment method'} (${toNYNight?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toNYNight, t]
  );

  const columns = useMemo(() => [{ name: toNYNight?.line_items[0].name ?? '', quantity: toNYNight?.line_items[0].quantity ?? '', total: toNYNight?.line_items[0].total ?? '' }], [toNYNight]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!toNYNight}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{toNYNight?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[toNYNight?.order.status] || 'gray'} fontSize={'x-large'}>
              {toNYNight?.order.status ? t(toNYNight.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!toNYNight}>
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

export default ToNYNightCard;
