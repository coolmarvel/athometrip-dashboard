import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';


import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

interface TopOfTheRockCardProps {
  data?: any;
}

const TopOfTheRockCard = ({ data: topOfTheRock }: TopOfTheRockCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: topOfTheRock?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: topOfTheRock?.billing.email ?? 'Email' },
      { label: t('Phone'), value: topOfTheRock?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${topOfTheRock?.payment?.payment_method_title ?? 'Payment method'} (${topOfTheRock?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [topOfTheRock, t]
  );

  const columns = useMemo(() => [{ name: topOfTheRock?.lineItem.name, quantity: topOfTheRock?.lineItem.quantity, total: topOfTheRock?.lineItem.total }], [topOfTheRock]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!topOfTheRock}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{topOfTheRock?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[topOfTheRock?.order.status] || 'gray'} fontSize={'x-large'}>
              {topOfTheRock?.order.status ? t(topOfTheRock.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!topOfTheRock}>
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

export default TopOfTheRockCard;
