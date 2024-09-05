import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { TbEdit } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { FormField } from '@/components';

interface WithLabelProps {
  id: any;
  label: string;
  value: string;
  isMemo?: boolean;
  isEdit?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  onEdit?: () => void;
  setMutate: () => void;
}

const WithLabel = ({ id, label, value, isMemo, isEdit, onEdit, isLoading, isSuccess, setMutate }: WithLabelProps) => {
  return (
    <Flex direction={'column'} gap={'2'}>
      <Heading size="xs" textTransform="uppercase">
        {label}
        {isMemo && <Button ml={'4'} size={'sm'} rightIcon={<TbEdit />} onClick={onEdit}>Edit</Button>}
      </Heading>
      {isEdit ? <MemoUpdateForm id={id} memo={value} isLoading={isLoading} isSuccess={isSuccess} setMutate={setMutate} /> : <Text fontSize="sm">{value}</Text>}
    </Flex>
  );
};

interface MemoUpdateFormProps {
  id: any;
  memo: any;
  isLoading?: boolean;
  isSuccess?: boolean;
  setMutate: ({ id, memo }: { id: any; memo: any; }) => void;
}

const MemoUpdateForm = ({ id, memo, isLoading, isSuccess, setMutate }: MemoUpdateFormProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm({ defaultValues: { memo } });

  return (
    <>
      <Flex
        as={'form'}
        direction={'column'}
        gap={'4'}
        onSubmit={handleSubmit(
          useCallback<(data: any) => void>((data) => {
            setMutate({ id, ...data });
          }, [id, setMutate]),
        )}
      >
        <FormField fieldType={'document'} name={'memo'} control={control} />
        <Button type={'submit'} alignSelf={'flex-end'}>
          {t('Submit')}
        </Button>
      </Flex>
    </>
  );
};

export default WithLabel;
