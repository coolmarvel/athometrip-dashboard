import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface BostonCardProps {
  data?: any;
}

const BostonCard = ({ data: boston }: BostonCardProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: boston?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: boston?.billing.email ?? 'Email' },
      { label: t('Phone'), value: boston?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${boston?.payment?.payment_method_title ?? 'Payment method'} (${boston?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [boston, convertDate, t],
  );

  const columns = useMemo(() => [{ name: boston?.line_items[0].name, quantity: boston?.line_items[0].quantity, total: boston?.line_items[0].total }] ?? [], [boston]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!boston}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{boston?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[boston?.order.status] || 'gray'} fontSize={'x-large'}>
              {boston?.order.status ? t(boston.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!boston}>
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

export default BostonCard;
