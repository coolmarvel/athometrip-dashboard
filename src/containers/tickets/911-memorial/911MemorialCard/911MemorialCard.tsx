import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface Memorial911CardProps {
  data?: any;
}

const Memorial911Card = ({ data: memorial911 }: Memorial911CardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: memorial911?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: memorial911?.billing.email ?? 'Email' },
      { label: t('Phone'), value: memorial911?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${memorial911?.payment?.payment_method_title ?? 'Payment method'} (${memorial911?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [memorial911, t],
  );

  const columns = useMemo(() => [{
    name: memorial911?.line_items[0].name,
    quantity: memorial911?.line_items[0].quantity,
    total: memorial911?.line_items[0].total,
  }] ?? [], [memorial911]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!memorial911}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{memorial911?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[memorial911?.order.status] || 'gray'} fontSize={'x-large'}>
              {memorial911?.order.status ? t(memorial911.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!memorial911}>
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

export default Memorial911Card;
