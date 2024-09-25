import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';


import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface ToJFKModalProps {
  toJFK: any;
  onClose: () => void;
}

const ToJFKModal = ({ toJFK, onClose }: ToJFKModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toJFK?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toJFK?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toJFK?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toJFK?.payment?.payment_method_title ?? 'Payment method'} (${toJFK?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toJFK, t],
  );

  const columns = useMemo(() => [{
    name: toJFK?.line_items[0]?.name,
    quantity: toJFK?.line_items[0]?.quantity,
    total: toJFK?.line_items[0]?.total,
  }], [toJFK]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as={'section'}
        onSubmit={useCallback(() => {
          setIsOpen(false);
        }, [])}
      >
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            Order #{toJFK?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[toJFK?.order.status] || 'gray'} fontSize={'x-large'}>
              {toJFK?.order.status ? t(toJFK.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!toJFK}>
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

export default ToJFKModal;
