import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';


import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface MLBMetsCardProps {
  data?: any;
}

const MLBMetsCard = ({ data: mlbMets }: MLBMetsCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: mlbMets?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: mlbMets?.billing.email ?? 'Email' },
      { label: t('Phone'), value: mlbMets?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${mlbMets?.payment?.payment_method_title ?? 'Payment method'} (${mlbMets?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [mlbMets,  t]
  );

  const columns = useMemo(() => [{ name: mlbMets?.lineItem.name, quantity: mlbMets?.lineItem.quantity, total: mlbMets?.lineItem.total }], [mlbMets]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!mlbMets}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{mlbMets?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[mlbMets?.order.status] || 'gray'} fontSize={'x-large'}>
              {mlbMets?.order.status ? t(mlbMets.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!mlbMets}>
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

export default MLBMetsCard;
