import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface LycaCardProps {
  data?: any;
}

const LycaCard = ({ data: lyca }: LycaCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: lyca?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: lyca?.billing.email ?? 'Email' },
      { label: t('Phone'), value: lyca?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${lyca?.payment?.payment_method_title ?? 'Payment method'} (${lyca?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [lyca, t]
  );

  const columns = useMemo(() => [{
    name: lyca?.line_items[0].name,
    quantity: lyca?.line_items[0].quantity,
    total: lyca?.line_items[0].total,
  }] ?? [], [lyca]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!lyca}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{lyca?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[lyca?.order.status] || 'gray'} fontSize={'x-large'}>
              {lyca?.order.status ? t(lyca.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!lyca}>
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

export default LycaCard;
