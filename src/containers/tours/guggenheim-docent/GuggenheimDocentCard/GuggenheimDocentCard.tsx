
import { statusColor } from '@/constants';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface GuggenheimDocentCardProps {
  data?: any;
}

const GuggenheimDocentCard = ({ data: guggenheimDocent }: GuggenheimDocentCardProps) => {
  const { t } = useTranslation();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: guggenheimDocent?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: guggenheimDocent?.billing.email ?? 'Email' },
      { label: t('Phone'), value: guggenheimDocent?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${guggenheimDocent?.payment?.payment_method_title ?? 'Payment method'} (${guggenheimDocent?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [guggenheimDocent, t],
  );

  const columns = useMemo(() => [{ name: guggenheimDocent?.lineItem.name, quantity: guggenheimDocent?.lineItem.quantity, total: guggenheimDocent?.lineItem.total }], [guggenheimDocent]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!guggenheimDocent}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{guggenheimDocent?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[guggenheimDocent?.order.status] || 'gray'} fontSize={'x-large'}>
              {guggenheimDocent?.order.status ? t(guggenheimDocent.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!guggenheimDocent}>
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

export default GuggenheimDocentCard;
