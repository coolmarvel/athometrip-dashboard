import { OrderCreate, useCreateOrder } from '@/apis';
import { useUpload } from '@/apis/upload';
import { ApiRoutes } from '@/constants';
import { useQueryKeyParams } from '@/hooks';
import { toUrl } from '@/utils';
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import OrderFormFields from './OrderFormFields';
import OrderProfileInput from './OrderProfileInput';

interface OrderCreateModalProps {
  onClose: () => void;
}

const OrderCreateModal = ({ onClose }: OrderCreateModalProps) => {
  const { register, handleSubmit } = useForm<OrderCreate>();
  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.Order));
  const { mutate: createOrder, isLoading: createOrderIsLoading, isSuccess: createOrderIsSuccess } = useCreateOrder(queryKeyParams);
  const { mutate: upload, isLoading: uploadIsLoading } = useUpload();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState('');
  const { t } = useTranslation();

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as={'form'}
        onSubmit={handleSubmit(
          useCallback(
            (data) => {
              if (!file) return;
              const formData = new FormData();
              formData.append('file', file);

              upload(formData, {
                onSuccess: (res) => {
                  // data.profile = res.data;
                  createOrder(data, { onSuccess: onClose });
                },
              });
            },
            [file, upload, createOrder, onClose]
          )
        )}
      >
        <ModalHeader>{t('Create Order')}</ModalHeader>
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
            {/* <OrderFormFields fields={['name', 'email', 'phone']} register={register} /> */}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button mr={'3'} onClick={onClose}>
            {t('Close')}
          </Button>
          <Button
            variant="ghost"
            type={'submit'}
            isLoading={uploadIsLoading || createOrderIsLoading || createOrderIsSuccess}
            isDisabled={uploadIsLoading || createOrderIsLoading || createOrderIsSuccess}
          >
            {t('Create Order')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderCreateModal;
