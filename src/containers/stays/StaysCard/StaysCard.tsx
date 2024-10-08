import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';


import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface StaysCardProps {
  data?: any;
}

const StaysCard = ({ data: stays }: StaysCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: stays?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: stays?.billing.email ?? 'Email' },
      { label: t('Phone'), value: stays?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${stays?.payment?.payment_method_title ?? 'Payment method'} (${stays?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [stays, t],
  );

  const columns = useMemo(() => [{
    name: stays?.line_items[0].name ?? '',
    quantity: stays?.line_items[0].quantity ?? '',
    total: stays?.line_items[0].total ?? '',
  }], [stays]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!stays}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{stays?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[stays?.order.status] || 'gray'} fontSize={'x-large'}>
              {stays?.order.status ? t(stays.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!stays}>
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

export default StaysCard;
