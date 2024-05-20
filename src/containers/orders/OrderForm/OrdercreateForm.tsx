import { PostCreate, useCreatePost } from '@/apis';
import { useGetMe } from '@/apis/auth';
import { FormField } from '@/components';
import { PageRoutes } from '@/constants';
import { useSafePush } from '@/hooks';
import { toUrl } from '@/utils';
import { Button, Flex } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const OrderCreateForm = () => {
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  const { register, handleSubmit, control } = useForm<PostCreate>({
    defaultValues: {
      userId: me?.id,
    },
  });
  const { mutate: createPost, isLoading, isSuccess } = useCreatePost();
  const { t } = useTranslation();

  return (
    <Flex
      as={'form'}
      direction="column"
      gap={'4'}
      onSubmit={handleSubmit(
        useCallback(
          (data) =>
            createPost(data, {
              onSuccess: (res) => {
                push(toUrl(PageRoutes.PostDetail, { id: res.data }));
              },
            }),
          [createPost, push]
        )
      )}
    >
      <FormField fieldType={'string'} isRequired label={t('Title')} placeholder={t('Title')} {...register('title')} />
      <FormField fieldType={'document'} name={'content'} control={control} />
      <Button type={'submit'} isLoading={isLoading || isSuccess} isDisabled={isLoading || isSuccess} alignSelf={'flex-end'}>
        {t('Submit')}
      </Button>
    </Flex>
  );
};

export default OrderCreateForm;
