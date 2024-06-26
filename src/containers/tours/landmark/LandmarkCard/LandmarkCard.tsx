import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface LandmarkCardProps {
  data?: any;
}

const LandmarkCard = ({ data: landmark }: LandmarkCardProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: landmark?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: landmark?.billing.email ?? 'Email' },
      { label: t('Phone'), value: landmark?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${landmark?.payment?.payment_method_title ?? 'Payment method'} (${landmark?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [landmark, convertDate, t],
  );

  const columns = useMemo(() => [{ name: landmark?.lineItem.name, quantity: landmark?.lineItem.quantity, total: landmark?.lineItem.total }] ?? [], [landmark]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!landmark}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{landmark?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[landmark?.order.status] || 'gray'} fontSize={'x-large'}>
              {landmark?.order.status ? t(landmark.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!landmark}>
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

export default LandmarkCard;
