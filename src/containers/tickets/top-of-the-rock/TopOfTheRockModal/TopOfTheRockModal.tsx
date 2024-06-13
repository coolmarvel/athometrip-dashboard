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

interface TopOfTheRockModalProps {
  topOfTheRock: any;
  onClose: () => void;
}

const TopOfTheRockModal = ({ topOfTheRock, onClose }: TopOfTheRockModalProps) => {
  const { t } = useTranslation();
  const convertDate = useConvertDate();
  const [isOpen, setIsOpen] = useState(true);

  const attributes = useMemo(
    () => [
      { label: t('Name'), value: topOfTheRock?.billing.first_name ?? 'Name' },
      { label: t('Email'), value: topOfTheRock?.billing.email ?? 'Email' },
      { label: t('Phone'), value: topOfTheRock?.billing.phone ?? 'Phone' },
      { label: t('Payment Via'), value: `${topOfTheRock?.payment?.payment_method_title ?? 'Payment method'} (${topOfTheRock?.payment?.transaction_id ?? 'Transaction ID'})` },
    ],
    [topOfTheRock, convertDate, t]
  );

  const columns = useMemo(() => [{ name: topOfTheRock?.lineItem.name, quantity: topOfTheRock?.lineItem.quantity, total: topOfTheRock?.lineItem.total }] ?? [], [topOfTheRock]);

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
            Order #{topOfTheRock?.order.id ?? t('Order ID')}
            <Badge colorScheme={statusColor[topOfTheRock?.order.status] || 'gray'} fontSize={'x-large'}>
              {topOfTheRock?.order.status ? t(topOfTheRock.order.status) : t('Status')}
            </Badge>
          </Flex>
          {/* <ModalCloseButton /> */}
        </ModalHeader>

        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <Box p={5}>
              <Stack divider={<StackDivider />} spacing={3}>
                {attributes.map((attribute, index) => (
                  <Skeleton key={index} isLoaded={!!topOfTheRock}>
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

export default TopOfTheRockModal;
