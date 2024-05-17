import { useGetMe } from '@/apis';
import { PageRoutes, defaultQuery } from '@/constants';
import { useSafePush } from '@/hooks';
import { useModalStore } from '@/stores';
import { toUrl } from '@/utils';
import { Button, Card, CardBody, CardHeader, Flex, Skeleton } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TbEdit } from 'react-icons/tb';

interface OrderCardProps {
  data?: any; // TODO. order type
}

const OrderCard = ({ data: order }: OrderCardProps) => {
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  // TODO. useDeleteOrder
  const { openConfirm } = useModalStore(['openConfirm']);
  const { t } = useTranslation();
  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <Skeleton isLoaded={!!order}>
          <Flex justify={'space-between'}>
            {/* <OrderWriter order={order} /> */}
            {me?.id === order?.userId && (
              <Flex gap={'4'}>
                <Button rightIcon={<TbEdit />} onClick={() => push(toUrl(PageRoutes.EditOrder, { id: order?.id }))}>
                  {t('Edit')}
                </Button>
                <Button
                  rightIcon={<TbEdit />}
                  onClick={() => {
                    if (!order?.id) return;
                    openConfirm({
                      title: t('Delete Order'),
                      content: t('Are you sure you want to delete this order?'),
                      onConfirm: () => {},
                      // deletePost(post?.id, {
                      //   onSuccess: () => {
                      //     push({ pathname: toUrl(PageRoutes.Posts), query: defaultQuery });
                      //   },
                      // }),
                    });
                  }}
                >
                  {t('Delete')}
                </Button>
              </Flex>
            )}
          </Flex>
        </Skeleton>
      </CardHeader>

      {/* Body */}
      <CardBody></CardBody>
    </Card>
  );
};

export default OrderCard;
