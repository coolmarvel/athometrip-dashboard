import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface ToEWRModalProps {
  toEWR: any;
  onClose: () => void;
}

const ToEWRModal = ({ toEWR, onClose }: ToEWRModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: toEWR?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: toEWR?.billing.email ?? 'Email' },
      { label: t('Phone'), value: toEWR?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${toEWR?.payment?.payment_method_title ?? 'Payment method'} (${toEWR?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [toEWR, t],
  );

  const columns = useMemo(() => [{
    name: toEWR?.line_items[0]?.name,
    quantity: toEWR?.line_items[0]?.quantity,
    total: toEWR?.line_items[0]?.total,
  }] ?? [], [toEWR]);

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
            Order #{toEWR?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[toEWR?.order.status] || 'gray'} fontSize={'x-large'}>
              {toEWR?.order.status ? t(toEWR.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!toEWR}>
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

export default ToEWRModal;
