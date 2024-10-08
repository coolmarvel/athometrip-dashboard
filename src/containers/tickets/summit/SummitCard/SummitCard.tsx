import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';


import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface SummitCardProps {
  data?: any;
}

const SummitCard = ({ data: summit }: SummitCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: summit?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: summit?.billing.email ?? 'Email' },
      { label: t('Phone'), value: summit?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${summit?.payment?.payment_method_title ?? 'Payment method'} (${summit?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [summit, t],
  );

  const columns = useMemo(() => [{ name: summit?.lineItem.name, quantity: summit?.lineItem.quantity, total: summit?.lineItem.total }], [summit]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!summit}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{summit?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[summit?.order.status] || 'gray'} fontSize={'x-large'}>
              {summit?.order.status ? t(summit.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!summit}>
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

export default SummitCard;
