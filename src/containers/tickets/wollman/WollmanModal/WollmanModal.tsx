import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate } from '@/hooks';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

interface WollmanModalProps {
  wollman: any;
  onClose: () => void;
}

const WollmanModal = ({ wollman, onClose }: WollmanModalProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: wollman?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: wollman?.billing.email ?? 'Email' },
      { label: t('Phone'), value: wollman?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${wollman?.payment?.payment_method_title ?? 'Payment method'} (${wollman?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [wollman, convertDate, t]
  );

  const columns = useMemo(() => [{ name: wollman?.line_items[0]?.name, quantity: wollman?.line_items[0]?.quantity, total: wollman?.line_items[0]?.total }] ?? [], [wollman]);

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
            Order #{wollman?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[wollman?.order.status] || 'gray'} fontSize={'x-large'}>
              {wollman?.order.status ? t(wollman.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!wollman}>
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

export default WollmanModal;
