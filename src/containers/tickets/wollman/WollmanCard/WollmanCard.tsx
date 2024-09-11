import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface WollmanCardProps {
  data?: any;
}

const WollmanCard = ({ data: wollman }: WollmanCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: wollman?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: wollman?.billing.email ?? 'Email' },
      { label: t('Phone'), value: wollman?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${wollman?.payment?.payment_method_title ?? 'Payment method'} (${wollman?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [wollman, t],
  );

  const columns = useMemo(() => [{ name: wollman?.lineItem.name, quantity: wollman?.lineItem.quantity, total: wollman?.lineItem.total }] ?? [], [wollman]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!wollman}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{wollman?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[wollman?.order.status] || 'gray'} fontSize={'x-large'}>
              {wollman?.order.status ? t(wollman.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!wollman}>
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

export default WollmanCard;
