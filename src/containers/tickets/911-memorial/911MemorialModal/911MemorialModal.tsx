import { WithLabel } from '@/components';
import { useConvertDate } from '@/hooks';
import {
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  StackDivider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

interface Memorial911ModalProps {
  memorial911Modal: any;
  onClose: () => void;
}

const statusColorMapping: any = {
  processing: 'yellow',
  completed: 'green',
  cancelled: 'red',
  refunded: 'purple',
  pending: 'gray',
  failed: 'orange',
};

const Memorial911Modal = ({ memorial911Modal, onClose }: Memorial911ModalProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: memorial911Modal?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: memorial911Modal?.billing.email ?? 'Email' },
      { label: t('Phone'), value: memorial911Modal?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${memorial911Modal?.payment?.payment_method_title ?? 'Payment method'} (${memorial911Modal?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [memorial911Modal, convertDate, t]
  );

  const columns = useMemo(
    () =>
      [
        {
          name: memorial911Modal?.lineItem.parent_name,
          quantity: memorial911Modal?.lineItem.quantity,
          total: memorial911Modal?.lineItem.total,
        },
      ] ?? [],
    [memorial911Modal]
  );

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
            Order #{memorial911Modal?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColorMapping[memorial911Modal?.order.status] || 'gray'} fontSize={'x-large'}>
              {memorial911Modal?.order.status ? t(memorial911Modal.order.status) : t('Status')}
            </Badge>
          </Flex>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!memorial911Modal}>
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
                    <Td>{product.name}</Td>
                    <Td isNumeric>{product.quantity}</Td>
                    <Td isNumeric>${product.total}</Td>
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

export default Memorial911Modal;
