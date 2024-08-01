import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface WoodburyModalProps {
  woodbury: any;
  onClose: () => void;
}

const WoodburyModal = ({ woodbury, onClose }: WoodburyModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: woodbury?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: woodbury?.billing.email ?? 'Email' },
      { label: t('Phone'), value: woodbury?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${woodbury?.payment?.payment_method_title ?? 'Payment method'} (${woodbury?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [woodbury, t],
  );

  const columns = useMemo(() => [{ name: woodbury?.line_items[0].name, quantity: woodbury?.line_items[0].quantity, total: woodbury?.line_items[0].total }] ?? [], [woodbury]);

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
            Order #{woodbury?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[woodbury?.order.status] || 'gray'} fontSize={'x-large'}>
              {woodbury?.order.status ? t(woodbury.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!woodbury}>
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

export default WoodburyModal;
