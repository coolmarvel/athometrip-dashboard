import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface MomaDocentCardProps {
  data?: any;
}

const MomaDocentCard = ({ data: momaDocent }: MomaDocentCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: momaDocent?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: momaDocent?.billing.email ?? 'Email' },
      { label: t('Phone'), value: momaDocent?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${momaDocent?.payment?.payment_method_title ?? 'Payment method'} (${momaDocent?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [momaDocent, t]
  );

  const columns = useMemo(() => [{ name: momaDocent?.line_items[0].name, quantity: momaDocent?.line_items[0].quantity, total: momaDocent?.line_items[0].total }] ?? [], [momaDocent]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!momaDocent}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{momaDocent?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[momaDocent?.order.status] || 'gray'} fontSize={'x-large'}>
              {momaDocent?.order.status ? t(momaDocent.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!momaDocent}>
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

export default MomaDocentCard;
