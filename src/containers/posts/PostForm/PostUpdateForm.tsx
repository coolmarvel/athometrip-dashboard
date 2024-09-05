import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Flex } from '@chakra-ui/react';

import { toUrl } from '@/utils';
import { useSafePush } from '@/hooks';
import { FormField } from '@/components';
import { PageRoutes } from '@/constants';
import { PostUpdate, useUpdatePost } from '@/apis';

interface PostUpdateFormProps {
  post: any;
}

const PostUpdateForm = ({ post }: PostUpdateFormProps) => {
  const { push } = useSafePush();
  const { t } = useTranslation();

  const { mutate: updatePost, isLoading, isSuccess } = useUpdatePost(post.id);
  const { register, handleSubmit, control } = useForm<PostUpdate>({ defaultValues: { ...post } });

  return (
    <Flex
      as={'form'}
      direction="column"
      gap={'4'}
      onSubmit={handleSubmit(
        useCallback(
          (data) =>
            updatePost(data, {
              onSuccess: (res) => {
                push(toUrl(PageRoutes.PostDetail, { id: res.data }));
              },
            }),
          [updatePost, push],
        ),
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

export default PostUpdateForm;
