import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';
import { Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { toUrl } from '@/utils';
import { ApiRoutes } from '@/constants';
import { useUpload } from '@/apis/upload';
import { useQueryKeyParams } from '@/hooks';
import { useUpdateUser, useUpdateUserInList } from '@/apis';

import UserFormFields from './UserFormFields';
import UserProfileInput from './UserProfileInput';

interface UserUpdateModalProps {
  user: any;
  onClose: () => void;
}

const UserUpdateModal = ({ user, onClose }: UserUpdateModalProps) => {
  const { t } = useTranslation();

  const [preview, setPreview] = useState(user.profile ?? '');
  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(true);
  const { register, handleSubmit } = useForm<any>({ defaultValues: user });

  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.User));
  const { mutate: upload, isLoading: uploadIsLoading } = useUpload();
  const { mutate: updateUser, isLoading: updateUserIsLoading, isSuccess: updateUserIsSuccess } = useUpdateUser(user.id);
  const { mutate: updateUserInList, isLoading: updateUserInListIsLoading, isSuccess: updateUserInListIsSuccess } = useUpdateUserInList(queryKeyParams);

  const mutate = useMemo(() => (!queryKeyParams ? updateUser : updateUserInList), [queryKeyParams, updateUser, updateUserInList]);

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
            [file, mutate, onClose, upload],
          ),
        )}
      >
        <ModalHeader>{t('Update User')}</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Flex direction={'column'} gap={'4'}>
            <UserProfileInput
              preview={preview}
              onChange={(file) => {
                setFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            <UserFormFields fields={['name', 'email', 'phone']} register={register} />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button mr={'3'} onClick={onClose}>
            {t('Close')}
          </Button>
          <Button
            variant="ghost"
            type={'submit'}
            isLoading={uploadIsLoading || updateUserIsLoading || updateUserIsSuccess || updateUserInListIsLoading || updateUserInListIsSuccess}
            isDisabled={uploadIsLoading || updateUserIsLoading || updateUserIsSuccess || updateUserInListIsLoading || updateUserInListIsSuccess}
          >
            {t('Update User')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserUpdateModal;
