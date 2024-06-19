import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface H2OEsimModalProps {
  h2oEsim: any;
  onClose: () => void;
}

const H2OEsimModal = ({ h2oEsim, onClose }: H2OEsimModalProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: h2oEsim?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: h2oEsim?.billing.email ?? 'Email' },
      { label: t('Phone'), value: h2oEsim?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${h2oEsim?.payment?.payment_method_title ?? 'Payment method'} (${h2oEsim?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [h2oEsim, convertDate, t]
  );

  const columns = useMemo(() => [{ name: h2oEsim?.lineItem.name, quantity: h2oEsim?.lineItem.quantity, total: h2oEsim?.lineItem.total }] ?? [], [h2oEsim]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as={'section'}
        onSubmit={useCallback(() => {
          setIsOpen(false);
        }, [onClose])}
      >
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            Order #{h2oEsim?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[h2oEsim?.order.status] || 'gray'} fontSize={'x-large'}>
              {h2oEsim?.order.status ? t(h2oEsim.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!h2oEsim}>
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
                    <Td fontSize={'small'}>{product.name}</Td>
                    <Td isNumeric fontSize={'small'}>
                      {product.quantity}
                    </Td>
                    <Td isNumeric fontSize={'small'}>
                      ${product.total}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button mr={'3'} onClick={onClose}>
            {t('Close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default H2OEsimModal;
