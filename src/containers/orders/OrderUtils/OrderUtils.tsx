import { useCreateOrder, useCreateTestOrders, useGetMe, useResetTestOrders } from '@/apis';
import { ApiRoutes, PageRoutes } from '@/constants';
import { useQueryKeyParams, useSafePush } from '@/hooks';
import { getRandomString, toUrl } from '@/utils';
import { Button, Flex, Tooltip } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GrPowerReset } from 'react-icons/gr';
import { TbPlus } from 'react-icons/tb';

const count: number = 100;

const OrderUtils = () => {
  const { data: me } = useGetMe();
  const { push } = useSafePush();
  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Order));
  const { mutate: createOrder, isLoading: createOrderIsLoading } = useCreateOrder(queryKeyParams);
  const { mutate: createTestOrders, isLoading: createTestOrdersIsLoading } = useCreateTestOrders(count);
  const { mutate: resetTestOrders, isLoading: resetTestOrdersIsLoading } = useResetTestOrders();
  const { t } = useTranslation();

  const handleCreateOrder = useCallback(() => {
    push(PageRoutes.WriteOrder);
  }, [push]);

  const handleCreateRandomOrder = useCallback(() => {
    if (!me) return;
    createOrder({
      title: getRandomString(10),
      content: getRandomString(100),
      userId: me.id,
    });
  }, [createOrder, me]);

  const handleCreateTestOrders = useCallback(() => {
    createTestOrders();
  }, [createTestOrders]);

  const handleResetTestOrders = useCallback(() => {
    resetTestOrders();
  }, [resetTestOrders]);

  return (
    <Flex gap={'4'} wrap={'wrap'}>
      <Tooltip hasArrow label={t('Create Order')}>
        <Button leftIcon={<TbPlus />} onClick={handleCreateOrder}>
          {t('Order')}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t('Create Random Order')}>
        <Button variant={'outline'} leftIcon={<TbPlus />} onClick={handleCreateRandomOrder} isLoading={createOrderIsLoading} isDisabled={createOrderIsLoading}>
          {t('Random Order')}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t('Create Orders for Test', { count })}>
        <Button variant={'outline'} leftIcon={<TbPlus />} onClick={handleCreateTestOrders} isLoading={createTestOrdersIsLoading} isDisabled={createTestOrdersIsLoading}>
          {`${count} ${t('Orders')}`}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t('Reset All Orders')}>
        <Button variant={'outline'} leftIcon={<GrPowerReset />} onClick={handleResetTestOrders} isLoading={resetTestOrdersIsLoading} isDisabled={resetTestOrdersIsLoading}>
          {t('Orders')}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default OrderUtils;
