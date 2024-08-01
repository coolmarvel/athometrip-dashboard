import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface WoodburyCardProps {
  data?: any;
}

const WoodburyCard = ({ data: woodbury }: WoodburyCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: woodbury?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: woodbury?.billing.email ?? 'Email' },
      { label: t('Phone'), value: woodbury?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${woodbury?.payment?.payment_method_title ?? 'Payment method'} (${woodbury?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [woodbury, t],
  );

  const columns = useMemo(() => [{ name: woodbury?.line_items[0].name, quantity: woodbury?.line_items[0].quantity, total: woodbury?.line_items[0].total }] ?? [], [woodbury]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!woodbury}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{woodbury?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[woodbury?.order.status] || 'gray'} fontSize={'x-large'}>
              {woodbury?.order.status ? t(woodbury.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!woodbury}>
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

export default WoodburyCard;
