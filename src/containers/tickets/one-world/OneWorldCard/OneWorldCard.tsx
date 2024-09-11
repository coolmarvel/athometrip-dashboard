import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface OneWorldCardProps {
  data?: any;
}

const OneWorldCard = ({ data: oneWorld }: OneWorldCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: oneWorld?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: oneWorld?.billing.email ?? 'Email' },
      { label: t('Phone'), value: oneWorld?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${oneWorld?.payment?.payment_method_title ?? 'Payment method'} (${oneWorld?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [oneWorld, t],
  );

  const columns = useMemo(() => [{ name: oneWorld?.lineItem.name, quantity: oneWorld?.lineItem.quantity, total: oneWorld?.lineItem.total }] ?? [], [oneWorld]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!oneWorld}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{oneWorld?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[oneWorld?.order.status] || 'gray'} fontSize={'x-large'}>
              {oneWorld?.order.status ? t(oneWorld.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!oneWorld}>
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

export default OneWorldCard;
