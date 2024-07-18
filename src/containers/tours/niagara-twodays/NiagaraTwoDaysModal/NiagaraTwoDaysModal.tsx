import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NiagaraTwoDaysModalProps {
  niagaraTwoDays: any;
  onClose: () => void;
}

const NiagaraTwoDaysModal = ({ niagaraTwoDays, onClose }: NiagaraTwoDaysModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: niagaraTwoDays?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: niagaraTwoDays?.billing.email ?? 'Email' },
      { label: t('Phone'), value: niagaraTwoDays?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${niagaraTwoDays?.payment?.payment_method_title ?? 'Payment method'} (${niagaraTwoDays?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [niagaraTwoDays, t],
  );

  const columns = useMemo(() => [{
    name: niagaraTwoDays?.line_items[0].name,
    quantity: niagaraTwoDays?.line_items[0].quantity,
    total: niagaraTwoDays?.line_items[0].total,
  }] ?? [], [niagaraTwoDays]);

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
            Order #{niagaraTwoDays?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[niagaraTwoDays?.order.status] || 'gray'} fontSize={'x-large'}>
              {niagaraTwoDays?.order.status ? t(niagaraTwoDays.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!niagaraTwoDays}>
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

export default NiagaraTwoDaysModal;