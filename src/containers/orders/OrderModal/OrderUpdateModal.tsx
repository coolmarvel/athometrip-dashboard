import { Order, OrderUpdate, useUpdateOrder, useUpdateOrderInList } from '@/apis';
import { useUpload } from '@/apis/upload';
import { ApiRoutes } from '@/constants';
import { useQueryKeyParams } from '@/hooks';
import { toUrl } from '@/utils';
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import OrderFormFields from './OrderFormFields';
import OrderProfileInput from './OrderProfileInput';

interface OrderUpdateModalProps {
  Order: Order;
  onClose: () => void;
}

const OrderUpdateModal = ({ Order, onClose }: OrderUpdateModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Order));
  const { register, handleSubmit } = useForm<OrderUpdate>({
    defaultValues: Order,
  });
  const { mutate: updateOrder, isLoading: updateOrderIsLoading, isSuccess: updateOrderIsSuccess } = useUpdateOrder(Order.id);
  const { mutate: updateOrderInList, isLoading: updateOrderInListIsLoading, isSuccess: updateOrderInListIsSuccess } = useUpdateOrderInList(queryKeyParams);
  const { mutate: upload, isLoading: uploadIsLoading } = useUpload();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(Order.profile ?? '');
  const { t } = useTranslation();

  const mutate = useMemo(() => (!queryKeyParams ? updateOrder : updateOrderInList), [queryKeyParams, updateOrder, updateOrderInList]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(
          useCallback(
            (data) => {
              setIsOpen(false);
              if (file) {
                const formData = new FormData();
                formData.append('file', file);

                upload(formData, {
                  onSuccess: (res) => {
                    data.profile = res.data;
                    mutate(data, { onSuccess: onClose });
                  },
                });
              } else {
                mutate(data, { onSuccess: onClose });
              }
            },
            [file, mutate, onClose, upload]
          )
        )}
      >
        <ModalHeader>{t('Update Order')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <OrderProfileInput
              preview={preview}
              onChange={(file) => {
                setFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            <OrderFormFields fields={['name', 'email', 'phone']} register={register} />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button mr={'3'} onClick={onClose}>
            {t('Close')}
          </Button>
          <Button
            variant="ghost"
            type={'submit'}
            isLoading={uploadIsLoading || updateOrderIsLoading || updateOrderIsSuccess || updateOrderInListIsLoading || updateOrderInListIsSuccess}
            isDisabled={uploadIsLoading || updateOrderIsLoading || updateOrderIsSuccess || updateOrderInListIsLoading || updateOrderInListIsSuccess}
          >
            {t('Update Order')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderUpdateModal;
