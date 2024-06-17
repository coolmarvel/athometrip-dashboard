import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
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

interface TMobileModalProps {
  tMobile: any;
  onClose: () => void;
}

const TMobileModal = ({ tMobile, onClose }: TMobileModalProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: tMobile?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: tMobile?.billing.email ?? 'Email' },
      { label: t('Phone'), value: tMobile?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${tMobile?.payment?.payment_method_title ?? 'Payment method'} (${tMobile?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [tMobile, convertDate, t]
  );

  const columns = useMemo(() => [{ name: tMobile?.lineItem.name, quantity: tMobile?.lineItem.quantity, total: tMobile?.lineItem.total }] ?? [], [tMobile]);

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
            Order #{tMobile?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[tMobile?.order.status] || 'gray'} fontSize={'x-large'}>
              {tMobile?.order.status ? t(tMobile.order.status) : t('Status')}
            </Badge>
          </Flex>
          {/* <ModalCloseButton /> */}
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!tMobile}>
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

export default TMobileModal;
