import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MetroDocentModalProps {
  metroDocent: any;
  onClose: () => void;
}

const MetroDocentModal = ({ metroDocent, onClose }: MetroDocentModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: metroDocent?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: metroDocent?.billing.email ?? 'Email' },
      { label: t('Phone'), value: metroDocent?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${metroDocent?.payment?.payment_method_title ?? 'Payment method'} (${metroDocent?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [metroDocent, t]
  );

  const columns = useMemo(() => [{ name: metroDocent?.line_items[0].name, quantity: metroDocent?.line_items[0].quantity, total: metroDocent?.line_items[0].total }] ?? [], [metroDocent]);

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
            Order #{metroDocent?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[metroDocent?.order.status] || 'gray'} fontSize={'x-large'}>
              {metroDocent?.order.status ? t(metroDocent.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!metroDocent}>
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

export default MetroDocentModal;
