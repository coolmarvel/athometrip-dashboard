import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface ModernCardProps {
  data?: any;
}

const ModernCard = ({ data: modern }: ModernCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: modern?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: modern?.billing.email ?? 'Email' },
      { label: t('Phone'), value: modern?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${modern?.payment?.payment_method_title ?? 'Payment method'} (${modern?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [modern, t],
  );

  const columns = useMemo(() => [{
    name: modern?.line_items[0].name,
    quantity: modern?.line_items[0].quantity,
    total: modern?.line_items[0].total,
  }] ?? [], [modern]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!modern}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{modern?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[modern?.order.status] || 'gray'} fontSize={'x-large'}>
              {modern?.order.status ? t(modern.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!modern}>
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

export default ModernCard;
