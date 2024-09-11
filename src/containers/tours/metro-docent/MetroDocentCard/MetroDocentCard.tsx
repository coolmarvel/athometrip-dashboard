import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface MetroDocentCardProps {
  data?: any;
}

const MetroDocentCard = ({ data: metroDocent }: MetroDocentCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: metroDocent?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: metroDocent?.billing.email ?? 'Email' },
      { label: t('Phone'), value: metroDocent?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${metroDocent?.payment?.payment_method_title ?? 'Payment method'} (${metroDocent?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [metroDocent, t]
  );

  const columns = useMemo(() => [{ name: metroDocent?.line_items[0].name, quantity: metroDocent?.line_items[0].quantity, total: metroDocent?.line_items[0].total }] ?? [], [metroDocent]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!metroDocent}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{metroDocent?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[metroDocent?.order.status] || 'gray'} fontSize={'x-large'}>
              {metroDocent?.order.status ? t(metroDocent.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!metroDocent}>
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

export default MetroDocentCard;
