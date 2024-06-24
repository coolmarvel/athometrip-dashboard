import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface TMobileCardProps {
  data?: any;
}

const TMobileCard = ({ data: tMobile }: TMobileCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: tMobile?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: tMobile?.billing.email ?? 'Email' },
      { label: t('Phone'), value: tMobile?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${tMobile?.payment?.payment_method_title ?? 'Payment method'} (${tMobile?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [tMobile, t],
  );

  const columns = useMemo(() => [{ name: tMobile?.lineItem.name, quantity: tMobile?.lineItem.quantity, total: tMobile?.lineItem.total }] ?? [], [tMobile]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!tMobile}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{tMobile?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[tMobile?.order.status] || 'gray'} fontSize={'x-large'}>
              {tMobile?.order.status ? t(tMobile.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!tMobile}>
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

export default TMobileCard;
