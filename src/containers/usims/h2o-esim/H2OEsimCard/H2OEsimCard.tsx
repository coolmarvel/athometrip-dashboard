import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface H2OEsimCardProps {
  data?: any;
}

const H2OEsimCard = ({ data: h2oEsim }: H2OEsimCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: h2oEsim?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: h2oEsim?.billing.email ?? 'Email' },
      { label: t('Phone'), value: h2oEsim?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${h2oEsim?.payment?.payment_method_title ?? 'Payment method'} (${h2oEsim?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [h2oEsim, t],
  );

  const columns = useMemo(() => [{
    name: h2oEsim?.line_items[0].name,
    quantity: h2oEsim?.line_items[0].quantity,
    total: h2oEsim?.line_items[0].total,
  }] ?? [], [h2oEsim]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!h2oEsim}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{h2oEsim?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[h2oEsim?.order.status] || 'gray'} fontSize={'x-large'}>
              {h2oEsim?.order.status ? t(h2oEsim.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!h2oEsim}>
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

export default H2OEsimCard;
