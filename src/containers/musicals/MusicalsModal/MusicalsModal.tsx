import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { Badge, Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface MusicalsModalProps {
  musicals: any;
  onClose: () => void;
}

const MusicalsModal = ({ musicals, onClose }: MusicalsModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: musicals?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: musicals?.billing.email ?? 'Email' },
      { label: t('Phone'), value: musicals?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${musicals?.payment?.payment_method_title ?? 'Payment method'} (${musicals?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [musicals, t],
  );

  const columns = useMemo(() => [{
    name: musicals?.line_items[0]?.name,
    quantity: musicals?.line_items[0]?.quantity,
    total: musicals?.line_items[0]?.total,
  }] ?? [], [musicals]);

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
            Order #{musicals?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[musicals?.order.status] || 'gray'} fontSize={'x-large'}>
              {musicals?.order.status ? t(musicals.order.status) : t('Status')}
            </Badge>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!musicals}>
                    {/* <WithLabel label={attribute.label} value={attribute.value} /> */}
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

export default MusicalsModal;
