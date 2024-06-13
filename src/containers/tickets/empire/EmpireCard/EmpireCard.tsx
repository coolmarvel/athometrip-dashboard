import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface EmpireCardProps {
  data?: any;
}

const EmpireCard = ({ data: empire }: EmpireCardProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: empire?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: empire?.billing.email ?? 'Email' },
      { label: t('Phone'), value: empire?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${empire?.payment?.payment_method_title ?? 'Payment method'} (${empire?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [empire, convertDate, t]
  );

  const columns = useMemo(() => [{ name: empire?.lineItem.name, quantity: empire?.lineItem.quantity, total: empire?.lineItem.total }] ?? [], [empire]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!empire}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{empire?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[empire?.order.status] || 'gray'} fontSize={'x-large'}>
              {empire?.order.status ? t(empire.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!empire}>
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

export default EmpireCard;
