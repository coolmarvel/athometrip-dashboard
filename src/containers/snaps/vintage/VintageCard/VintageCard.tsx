import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';


import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface VintageCardProps {
  data?: any;
}

const VintageCard = ({ data: vintage }: VintageCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: vintage?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: vintage?.billing.email ?? 'Email' },
      { label: t('Phone'), value: vintage?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${vintage?.payment?.payment_method_title ?? 'Payment method'} (${vintage?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [vintage, t],
  );

  const columns = useMemo(() => [{
    name: vintage?.line_items[0].name ?? '',
    quantity: vintage?.line_items[0].quantity ?? '',
    total: vintage?.line_items[0].total ?? '',
  }], [vintage]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!vintage}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{vintage?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[vintage?.order.status] || 'gray'} fontSize={'x-large'}>
              {vintage?.order.status ? t(vintage.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!vintage}>
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

export default VintageCard;
