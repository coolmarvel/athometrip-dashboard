import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface WhitneyDocentCardProps {
  data?: any;
}

const WhitneyDocentCard = ({ data: whitneyDocent }: WhitneyDocentCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: whitneyDocent?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: whitneyDocent?.billing.email ?? 'Email' },
      { label: t('Phone'), value: whitneyDocent?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${whitneyDocent?.payment?.payment_method_title ?? 'Payment method'} (${whitneyDocent?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [whitneyDocent, t],
  );

  const columns = useMemo(() => [{ name: whitneyDocent?.lineItem.name, quantity: whitneyDocent?.lineItem.quantity, total: whitneyDocent?.lineItem.total }] ?? [], [whitneyDocent]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!whitneyDocent}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{whitneyDocent?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[whitneyDocent?.order.status] || 'gray'} fontSize={'x-large'}>
              {whitneyDocent?.order.status ? t(whitneyDocent.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!whitneyDocent}>
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

export default WhitneyDocentCard;
