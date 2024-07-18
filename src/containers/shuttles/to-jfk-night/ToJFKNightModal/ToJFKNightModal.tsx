import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface ToJFKNightModalProps {
  toJFKNight: any;
  onClose: () => void;
}

const ToJFKNightModal = ({ toJFKNight, onClose }: ToJFKNightModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toJFKNight?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toJFKNight?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toJFKNight?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toJFKNight?.payment?.payment_method_title ?? 'Payment method'} (${toJFKNight?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toJFKNight, t],
  );

  const columns = useMemo(() => [{
    name: toJFKNight?.line_items[0]?.name,
    quantity: toJFKNight?.line_items[0]?.quantity,
    total: toJFKNight?.line_items[0]?.total,
  }] ?? [], [toJFKNight]);

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
            Order #{toJFKNight?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[toJFKNight?.order.status] || 'gray'} fontSize={'x-large'}>
              {toJFKNight?.order.status ? t(toJFKNight.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!toJFKNight}>
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

export default ToJFKNightModal;
