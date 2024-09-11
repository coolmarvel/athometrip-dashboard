import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface ToEWRCardProps {
  data?: any;
}

const ToEWRCard = ({ data: toEWR }: ToEWRCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toEWR?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toEWR?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toEWR?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toEWR?.payment?.payment_method_title ?? 'Payment method'} (${toEWR?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toEWR, t],
  );

  const columns = useMemo(() => [{
    name: toEWR?.line_items[0].name,
    quantity: toEWR?.line_items[0].quantity,
    total: toEWR?.line_items[0].total,
  }] ?? [], [toEWR]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!toEWR}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{toEWR?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[toEWR?.order.status] || 'gray'} fontSize={'x-large'}>
              {toEWR?.order.status ? t(toEWR.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!toEWR}>
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

export default ToEWRCard;
