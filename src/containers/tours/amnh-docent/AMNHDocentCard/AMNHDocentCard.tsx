import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface AMNHDocentCardProps {
  data?: any;
}

const AMNHDocentCard = ({ data: amnhDocent }: AMNHDocentCardProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: amnhDocent?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: amnhDocent?.billing.email ?? 'Email' },
      { label: t('Phone'), value: amnhDocent?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${amnhDocent?.payment?.payment_method_title ?? 'Payment method'} (${amnhDocent?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [amnhDocent, convertDate, t],
  );

  const columns = useMemo(() => [{ name: amnhDocent?.line_items[0].name, quantity: amnhDocent?.line_items[0].quantity, total: amnhDocent?.line_items[0].total }] ?? [], [amnhDocent]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!amnhDocent}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{amnhDocent?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[amnhDocent?.order.status] || 'gray'} fontSize={'x-large'}>
              {amnhDocent?.order.status ? t(amnhDocent.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!amnhDocent}>
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

export default AMNHDocentCard;
