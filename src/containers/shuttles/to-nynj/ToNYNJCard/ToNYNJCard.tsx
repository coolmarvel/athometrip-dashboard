import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface ToNYNJCardProps {
  data?: any;
}

const ToNYNJCard = ({ data: toNYNJ }: ToNYNJCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toNYNJ?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toNYNJ?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toNYNJ?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toNYNJ?.payment?.payment_method_title ?? 'Payment method'} (${toNYNJ?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toNYNJ, t]
  );

  const columns = useMemo(() => [{ name: toNYNJ?.line_items[0].name, quantity: toNYNJ?.line_items[0].quantity, total: toNYNJ?.line_items[0].total }] ?? [], [toNYNJ]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!toNYNJ}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{toNYNJ?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[toNYNJ?.order.status] || 'gray'} fontSize={'x-large'}>
              {toNYNJ?.order.status ? t(toNYNJ.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!toNYNJ}>
                <WithLabel label={attribute.label} value={attribute.value} />
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

export default ToNYNJCard;
