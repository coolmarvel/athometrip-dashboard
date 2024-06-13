import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface EllisIslandCardProps {
  data?: any;
}

const EllisIslandCard = ({ data: ellisIsland }: EllisIslandCardProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: ellisIsland?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: ellisIsland?.billing.email ?? 'Email' },
      { label: t('Phone'), value: ellisIsland?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${ellisIsland?.payment?.payment_method_title ?? 'Payment method'} (${ellisIsland?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [ellisIsland, convertDate, t]
  );

  const columns = useMemo(() => [{ name: ellisIsland?.lineItem.name, quantity: ellisIsland?.lineItem.quantity, total: ellisIsland?.lineItem.total }] ?? [], [ellisIsland]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!ellisIsland}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{ellisIsland?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[ellisIsland?.order.status] || 'gray'} fontSize={'x-large'}>
              {ellisIsland?.order.status ? t(ellisIsland.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!ellisIsland}>
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

export default EllisIslandCard;
