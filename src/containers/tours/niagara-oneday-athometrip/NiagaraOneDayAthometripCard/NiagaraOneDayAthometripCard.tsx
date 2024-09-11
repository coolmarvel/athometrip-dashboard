import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface NiagaraOneDayAthometripCardProps {
  data?: any;
}

const NiagaraOneDayAthometripCard = ({ data: niagaraOneDayAthometrip }: NiagaraOneDayAthometripCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: niagaraOneDayAthometrip?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: niagaraOneDayAthometrip?.billing.email ?? 'Email' },
      { label: t('Phone'), value: niagaraOneDayAthometrip?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${niagaraOneDayAthometrip?.payment?.payment_method_title ?? 'Payment method'} (${niagaraOneDayAthometrip?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [niagaraOneDayAthometrip, t],
  );

  const columns = useMemo(() => [{
    name: niagaraOneDayAthometrip?.line_items[0].name,
    quantity: niagaraOneDayAthometrip?.line_items[0].quantity,
    total: niagaraOneDayAthometrip?.line_items[0].total,
  }] ?? [], [niagaraOneDayAthometrip]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!niagaraOneDayAthometrip}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{niagaraOneDayAthometrip?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[niagaraOneDayAthometrip?.order.status] || 'gray'} fontSize={'x-large'}>
              {niagaraOneDayAthometrip?.order.status ? t(niagaraOneDayAthometrip.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!niagaraOneDayAthometrip}>
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

export default NiagaraOneDayAthometripCard;
