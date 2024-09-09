import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';
import { Divider, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Tag, Box, Flex, Skeleton, Stack, StackDivider } from '@chakra-ui/react';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';

import { WithLabel } from '@/components';
import { statusColor } from '@/constants';
import { useConvertDate, useSafePush } from '@/hooks';
import { handleStringKeyValue, ResponseType } from '@/types';

interface TopOfTheRockDrawerProps {
  topOfTheRock: ResponseType;
  setMutate: (data?: any) => void;
  onClose: () => void;
}

const TopOfTheRockDrawer = ({ topOfTheRock, setMutate, onClose }: TopOfTheRockDrawerProps) => {
  const convertDate = useConvertDate();
  const { router } = useSafePush();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleMemoEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

  const attributes = useMemo(() => [
    { label: t('Name'), value: topOfTheRock.billing?.first_name ?? 'Name' },
    { label: t('Email'), value: topOfTheRock.billing?.email ?? 'Email' },
    { label: t('Phone'), value: topOfTheRock.billing?.phone ?? 'Phone' },
    { label: t('Payment Via'), value: `${topOfTheRock.payment?.payment_method_title ?? 'Payment method'} (${topOfTheRock.payment?.transaction_id ?? 'Transaction ID'})` },
    { label: t('Type'), value: handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['성인-어린이'] ?? 'Type' },
    {
      label: t('Schedule (1)'),
      value: (() => {
        const date = convertDate(topOfTheRock.tour?.top_date ?? topOfTheRock.order?.meta_data?.top_date ?? handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['날짜']).split(' ')[0];
        const time = topOfTheRock.tour?.top_sunset ?? topOfTheRock.order?.meta_data?.top_sunset ?? handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['입장 희망시간(1순위)'] ?? '';
        return `${date} ${time}`;
      })(),
    },
    {
      label: t('Schedule (2)'),
      value: (() => {
        const date = convertDate(topOfTheRock.tour?.top_date ?? topOfTheRock.order?.meta_data?.top_date ?? handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['날짜'] ?? '').split(' ')[0];
        const time = topOfTheRock.tour?.tor_time_2 ?? topOfTheRock.order?.meta_data?.tor_time_2 ?? handleStringKeyValue(topOfTheRock.line_items?.[0]?.meta_data)['입장 희망시간(2순위)'] ?? '';
        return `${date} ${time}`;
      })(),
    },
    {
      label: t('Memo'),
      isMemo: true,
      isEdit: isEdit,
      id: topOfTheRock.order.id,
      onEdit: () => handleMemoEdit(),
      value: topOfTheRock.order.memo ?? '',
    },
  ], [isEdit, handleMemoEdit, topOfTheRock, convertDate, t]);

  const columns = useMemo(() => [{ name: topOfTheRock?.line_items?.[0]?.name, quantity: topOfTheRock?.line_items?.[0]?.quantity, total: topOfTheRock?.line_items?.[0]?.total }] ?? [], [topOfTheRock]);

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} size={'lg'} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center" gap="4">
              Order #{topOfTheRock?.order?.id ?? t('Order ID')}
              <Tag colorScheme={statusColor[topOfTheRock?.order?.status ?? ''] || 'gray'} fontSize={'x-large'}>
                {topOfTheRock?.order?.status ? t(topOfTheRock.order.status.toUpperCase()) : t('Status')}
              </Tag>
            </Flex>
            <DrawerCloseButton mt={'2'} />
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <Stack divider={<StackDivider />} spacing={3}>
                  {attributes.map((attribute, index) => (
                    <Skeleton key={index} isLoaded={!!topOfTheRock}>
                      <WithLabel
                        id={attribute.id}
                        setIsOpen={setIsOpen}
                        setIsEdit={setIsEdit}
                        setMutate={setMutate}
                        label={attribute.label}
                        value={attribute.value}
                        isMemo={attribute.isMemo}
                        isEdit={attribute.isEdit}
                        onEdit={attribute.onEdit}
                        after={router.query['after'] as string}
                        before={router.query['before'] as string}
                      />
                    </Skeleton>
                  ))}
                </Stack>
              </Box>

              <Divider />

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
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TopOfTheRockDrawer;