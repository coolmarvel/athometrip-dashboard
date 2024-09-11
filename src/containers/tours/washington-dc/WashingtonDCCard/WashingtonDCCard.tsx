import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface WashingtonDCCardProps {
  data?: any;
}

const WashingtonDCCard = ({ data: washington }: WashingtonDCCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: washington?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: washington?.billing.email ?? 'Email' },
      { label: t('Phone'), value: washington?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${washington?.payment?.payment_method_title ?? 'Payment method'} (${washington?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [washington, t],
  );

  const columns = useMemo(() => [{ name: washington?.line_items[0].name, quantity: washington?.line_items[0].quantity, total: washington?.line_items[0].total }] ?? [], [washington]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!washington}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{washington?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[washington?.order.status] || 'gray'} fontSize={'x-large'}>
              {washington?.order.status ? t(washington.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!washington}>
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

export default WashingtonDCCard;
