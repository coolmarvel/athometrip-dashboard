
import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LycaModalProps {
  lyca: any;
  onClose: () => void;
}

const LycaModal = ({ lyca, onClose }: LycaModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: lyca?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: lyca?.billing.email ?? 'Email' },
      { label: t('Phone'), value: lyca?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${lyca?.payment?.payment_method_title ?? 'Payment method'} (${lyca?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [lyca, t],
  );

  const columns = useMemo(() => [{
    name: lyca?.line_items[0].name ?? '',
    quantity: lyca?.line_items[0].quantity ?? '',
    total: lyca?.line_items[0].total ?? '',
  }], [lyca]);

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
            Order #{lyca?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[lyca?.order.status] || 'gray'} fontSize={'x-large'}>
              {lyca?.order.status ? t(lyca.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!lyca}>
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

export default LycaModal;
