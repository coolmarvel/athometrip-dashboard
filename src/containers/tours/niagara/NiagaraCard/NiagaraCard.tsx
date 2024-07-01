import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface NiagaraCardProps {
  data?: any;
}

const NiagaraCard = ({ data: niagara }: NiagaraCardProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: niagara?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: niagara?.billing.email ?? 'Email' },
      { label: t('Phone'), value: niagara?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${niagara?.payment?.payment_method_title ?? 'Payment method'} (${niagara?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [niagara, convertDate, t],
  );

  const columns = useMemo(() => [{ name: niagara?.lineItem.name, quantity: niagara?.lineItem.quantity, total: niagara?.lineItem.total }] ?? [], [niagara]);

  return (
    <Card>
      <CardHeader>
        <Skeleton isLoaded={!!niagara}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg">Order #{niagara?.order.id ?? t('Order ID')}</Heading>
            <Badge colorScheme={statusColor[niagara?.order.status] || 'gray'} fontSize={'x-large'}>
              {niagara?.order.status ? t(niagara.order.status) : t('Status')}
            </Badge>
          </Flex>
        </Skeleton>
      </CardHeader>

      <CardBody>
        <Box p={5}>
          <Stack divider={<StackDivider />} spacing={3}>
            {attributes.map((attribute, index) => (
              <Skeleton key={index} isLoaded={!!niagara}>
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

export default NiagaraCard;
