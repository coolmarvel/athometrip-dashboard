
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface MetroDocentPaintingCardProps {
  data?: any;
}

const MetroDocentPaintingCard = ({ data: metroDocentPainting }: MetroDocentPaintingCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: metroDocentPainting?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: metroDocentPainting?.billing.email ?? 'Email' },
      { label: t('Phone'), value: metroDocentPainting?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${metroDocentPainting?.payment?.payment_method_title ?? 'Payment method'} (${metroDocentPainting?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [metroDocentPainting, t]
  );

  const columns = useMemo(
    () => [{ name: metroDocentPainting?.lineItem.name, quantity: metroDocentPainting?.lineItem.quantity, total: metroDocentPainting?.lineItem.total }],
    [metroDocentPainting]
  );

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!metroDocentPainting}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{metroDocentPainting?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[metroDocentPainting?.order.status] || 'gray'} fontSize={'x-large'}>
              {metroDocentPainting?.order.status ? t(metroDocentPainting.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!metroDocentPainting}>
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

export default MetroDocentPaintingCard;
