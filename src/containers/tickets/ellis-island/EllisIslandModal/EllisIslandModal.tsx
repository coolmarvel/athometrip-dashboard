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

interface EllisIslandModalProps {
  ellisIsland: any;
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

const EllisIslandModal = ({ ellisIsland, onClose }: EllisIslandModalProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: ellisIsland?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: ellisIsland?.billing.email ?? 'Email' },
      { label: t('Phone'), value: ellisIsland?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${ellisIsland?.payment?.payment_method_title ?? 'Payment method'} (${ellisIsland?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [ellisIsland, convertDate, t]
  );

  const columns = useMemo(
    () =>
      [
        {
          name: ellisIsland?.lineItem.name,
          quantity: ellisIsland?.lineItem.quantity,
          total: ellisIsland?.lineItem.total,
        },
      ] ?? [],
    [ellisIsland]
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
            Order #{ellisIsland?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColorMapping[ellisIsland?.order.status] || 'gray'} fontSize={'x-large'}>
              {ellisIsland?.order.status ? t(ellisIsland.order.status) : t('Status')}
            </Badge>
          </Flex>
          <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!ellisIsland}>
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

export default EllisIslandModal;
