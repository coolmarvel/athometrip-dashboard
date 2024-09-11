import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface ToJFKCardProps {
  data?: any;
}

const ToJFKCard = ({ data: toJFK }: ToJFKCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toJFK?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toJFK?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toJFK?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toJFK?.payment?.payment_method_title ?? 'Payment method'} (${toJFK?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toJFK, t],
  );

  const columns = useMemo(() => [{
    name: toJFK?.line_items[0].name,
    quantity: toJFK?.line_items[0].quantity,
    total: toJFK?.line_items[0].total,
  }] ?? [], [toJFK]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!toJFK}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{toJFK?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[toJFK?.order.status] || 'gray'} fontSize={'x-large'}>
              {toJFK?.order.status ? t(toJFK.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!toJFK}>
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

export default ToJFKCard;
