import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { useModalStore } from '@/stores';
import { FormField } from '@/components';

type MutateProp = {
  id: any;
  after: string;
  before: string;
  memo: any;
};

interface MemoUpdateFormProps {
  id: any;
  memo: any;
  after: string;
  before: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setMutate: ({ id, after, before, memo }: MutateProp, options?: { onSuccess?: (response?: any) => void }) => void;
}

export const MemoUpdateForm = ({ id, memo, after, before, setIsOpen, setIsEdit, setMutate }: MemoUpdateFormProps) => {
  const { t } = useTranslation();
  const { openConfirm } = useModalStore(['openConfirm']);
  const { control, handleSubmit } = useForm({ defaultValues: { memo } });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 스크롤 이동
    }
  }, []);

  return (
    <>
      <Flex
        ref={formRef}
        as={'form'}
        direction={'column'}
        gap={'4'}
        onSubmit={handleSubmit(
          useCallback<(data: any) => void>(
            (data) => {
              openConfirm({
                title: t('Update Memo'),
                content: t('Are you sure you want to update memo this order?'),
                onConfirm: () =>
                  setMutate(
                    { id, after, before, ...data },
                    {
                      onSuccess: (response) => {
                        setIsEdit(false);
                        setIsOpen(false);
                      },
                    }
                  ),
              });
            },
            [openConfirm, t, setMutate, id, after, before, setIsOpen, setIsEdit]
          )
        )}
      >
        <FormField fieldType={'document'} name={'memo'} control={control} />
        <Flex alignSelf={'flex-end'} gap={2}>
          <Button variant={'outline'} onClick={() => setIsEdit(false)}>
            {t('Cancel')}
          </Button>
          <Button type={'submit'}>{t('Submit')}</Button>
        </Flex>
      </Flex>
    </>
  );
};
