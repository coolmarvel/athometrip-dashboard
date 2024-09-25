
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface NiagaraOneDayKingKongCardProps {
  data?: any;
}

const NiagaraOneDayKingKongCard = ({ data: niagaraOneDayKingKong }: NiagaraOneDayKingKongCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: niagaraOneDayKingKong?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: niagaraOneDayKingKong?.billing.email ?? 'Email' },
      { label: t('Phone'), value: niagaraOneDayKingKong?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${niagaraOneDayKingKong?.payment?.payment_method_title ?? 'Payment method'} (${niagaraOneDayKingKong?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [niagaraOneDayKingKong, t],
  );

  const columns = useMemo(() => [{
    name: niagaraOneDayKingKong?.line_items[0].name ?? '',
    quantity: niagaraOneDayKingKong?.line_items[0].quantity ?? '',
    total: niagaraOneDayKingKong?.line_items[0].total ?? '',
  }], [niagaraOneDayKingKong]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!niagaraOneDayKingKong}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{niagaraOneDayKingKong?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[niagaraOneDayKingKong?.order.status] || 'gray'} fontSize={'x-large'}>
              {niagaraOneDayKingKong?.order.status ? t(niagaraOneDayKingKong.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!niagaraOneDayKingKong}>
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

export default NiagaraOneDayKingKongCard;
