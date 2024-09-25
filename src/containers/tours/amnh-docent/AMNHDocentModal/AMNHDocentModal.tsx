
import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AMNHDocentModalProps {
  amnhDocent: any;
  onClose: () => void;
}

const AMNHDocentModal = ({ amnhDocent, onClose }: AMNHDocentModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: amnhDocent?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: amnhDocent?.billing.email ?? 'Email' },
      { label: t('Phone'), value: amnhDocent?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${amnhDocent?.payment?.payment_method_title ?? 'Payment method'} (${amnhDocent?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [amnhDocent, t],
  );

  const columns = useMemo(() => [{ name: amnhDocent?.line_items[0].name ?? '', quantity: amnhDocent?.line_items[0].quantity ?? '', total: amnhDocent?.line_items[0].total ?? '' }], [amnhDocent]);

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
            Order #{amnhDocent?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[amnhDocent?.order.status] || 'gray'} fontSize={'x-large'}>
              {amnhDocent?.order.status ? t(amnhDocent.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!amnhDocent}>
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

export default AMNHDocentModal;
