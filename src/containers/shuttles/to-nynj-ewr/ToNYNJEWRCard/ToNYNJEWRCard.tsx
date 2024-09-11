import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface ToNYNJEWRCardProps {
  data?: any;
}

const ToNYNJEWRCard = ({ data: toNYNJEWR }: ToNYNJEWRCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toNYNJEWR?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toNYNJEWR?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toNYNJEWR?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toNYNJEWR?.payment?.payment_method_title ?? 'Payment method'} (${toNYNJEWR?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toNYNJEWR, t]
  );

  const columns = useMemo(() => [{ name: toNYNJEWR?.line_items[0].name, quantity: toNYNJEWR?.line_items[0].quantity, total: toNYNJEWR?.line_items[0].total }] ?? [], [toNYNJEWR]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!toNYNJEWR}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{toNYNJEWR?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[toNYNJEWR?.order.status] || 'gray'} fontSize={'x-large'}>
              {toNYNJEWR?.order.status ? t(toNYNJEWR.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!toNYNJEWR}>
                {/* <WithLabel label={attribute.label} value={attribute.value} /> */}
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

export default ToNYNJEWRCard;
