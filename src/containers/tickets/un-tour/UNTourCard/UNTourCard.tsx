import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface UNTourCardProps {
  data?: any;
}

const UNTourCard = ({ data: unTour }: UNTourCardProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: unTour?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: unTour?.billing.email ?? 'Email' },
      { label: t('Phone'), value: unTour?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${unTour?.payment?.payment_method_title ?? 'Payment method'} (${unTour?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [unTour, convertDate, t]
  );

  const columns = useMemo(() => [{ name: unTour?.lineItem.name, quantity: unTour?.lineItem.quantity, total: unTour?.lineItem.total }] ?? [], [unTour]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!unTour}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{unTour?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[unTour?.order.status] || 'gray'} fontSize={'x-large'}>
              {unTour?.order.status ? t(unTour.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!unTour}>
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

export default UNTourCard;
