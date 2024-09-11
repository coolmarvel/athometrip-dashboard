import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface SingleDocentsCardProps {
  data?: any;
}

const SingleDocentsCard = ({ data: singleDocents }: SingleDocentsCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: singleDocents?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: singleDocents?.billing.email ?? 'Email' },
      { label: t('Phone'), value: singleDocents?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${singleDocents?.payment?.payment_method_title ?? 'Payment method'} (${singleDocents?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [singleDocents, t]
  );

  const columns = useMemo(() => [{ name: singleDocents?.line_items[0].name, quantity: singleDocents?.line_items[0].quantity, total: singleDocents?.line_items[0].total }] ?? [], [singleDocents]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!singleDocents}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{singleDocents?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[singleDocents?.order.status] || 'gray'} fontSize={'x-large'}>
              {singleDocents?.order.status ? t(singleDocents.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!singleDocents}>
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

export default SingleDocentsCard;
