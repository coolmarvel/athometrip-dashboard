import { TbEdit } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

import { FormField } from '@/components';
import { useModalStore } from '@/stores';

interface WithLabelProps {
  id: any;
  label: string;
  value: string;
  after: string;
  before: string;
  isMemo?: boolean;
  isEdit?: boolean;
  onEdit?: () => void;
  setMutate: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const WithLabel = ({ id, label, value, after, before, isMemo, isEdit, onEdit, setIsEdit, setIsOpen, setMutate }: WithLabelProps) => {
  const { t } = useTranslation();
  const memoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEdit && memoRef.current) {
      memoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Edit 모드일 때 스크롤
    }
  }, [isEdit]);

  return (
    <Flex direction={'column'} gap={'2'}>
      <Heading size="xs" textTransform="uppercase">
        {label}
        {isMemo && !isEdit && <Button ml={'4'} size={'sm'} rightIcon={<TbEdit />} onClick={onEdit}>Edit</Button>}
      </Heading>
      <div ref={memoRef}>
        {isEdit ? <MemoUpdateForm id={id} memo={value} after={after} before={before} setIsEdit={setIsEdit} setIsOpen={setIsOpen} setMutate={setMutate} /> :
          <Box dangerouslySetInnerHTML={{ __html: value ?? t('Content') }} />}
      </div>
    </Flex>
  );
};

interface MemoUpdateFormProps {
  id: any;
  memo: any;
  after: string;
  before: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setMutate: ({ id, after, before, memo }: { id: any; after: string; before: string; memo: any; }, options?: { onSuccess?: (response?: any) => void; }) => void;
}

const MemoUpdateForm = ({ id, memo, after, before, setIsOpen, setIsEdit, setMutate }: MemoUpdateFormProps) => {
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
          useCallback<(data: any) => void>((data) => {
            console.log('data ', data);
            openConfirm({
              title: t('Update Memo'),
              content: t('Are you sure you want to update memo this order?'),
              onConfirm: () =>
                setMutate({ id, after, before, ...data }, {
                  onSuccess: (response) => {
                    setIsEdit(false);
                    setIsOpen(false);
                  },
                }),
            });
          }, [openConfirm, t, setMutate, id, after, before, setIsOpen, setIsEdit]),
        )}
      >
        <FormField fieldType={'document'} name={'memo'} control={control} />
        <Flex alignSelf={'flex-end'} gap={2}>
          <Button variant={'outline'} onClick={() => setIsEdit(false)}>
            {t('Cancel')}
          </Button>
          <Button type={'submit'}>
            {t('Submit')}
          </Button>
        </Flex>

      </Flex>
    </>
  );
};

export default WithLabel;
