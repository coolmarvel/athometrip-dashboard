import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface NiagaraTwoDaysCardProps {
  data?: any;
}

const NiagaraTwoDaysCard = ({ data: niagaraTwoDays }: NiagaraTwoDaysCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: niagaraTwoDays?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: niagaraTwoDays?.billing.email ?? 'Email' },
      { label: t('Phone'), value: niagaraTwoDays?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${niagaraTwoDays?.payment?.payment_method_title ?? 'Payment method'} (${niagaraTwoDays?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [niagaraTwoDays, t],
  );

  const columns = useMemo(() => [{
    name: niagaraTwoDays?.line_items[0].name,
    quantity: niagaraTwoDays?.line_items[0].quantity,
    total: niagaraTwoDays?.line_items[0].total,
  }] ?? [], [niagaraTwoDays]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!niagaraTwoDays}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{niagaraTwoDays?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[niagaraTwoDays?.order.status] || 'gray'} fontSize={'x-large'}>
              {niagaraTwoDays?.order.status ? t(niagaraTwoDays.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!niagaraTwoDays}>
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

export default NiagaraTwoDaysCard;
