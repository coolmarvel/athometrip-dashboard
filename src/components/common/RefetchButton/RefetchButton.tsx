import { Button, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { RepeatIcon } from '@chakra-ui/icons';
import { useSafePush } from '@/hooks';
import { useCallback } from 'react';

interface RefetchButtonProps {
  isLoading: boolean;
  setMutate: () => void;
}

const RefetchButton = ({ isLoading, setMutate }: RefetchButtonProps) => {
  const { router } = useSafePush();
  const { t } = useTranslation();

  const after =
    (router.query?.after as string) ??
    new Date(new Date().setDate(new Date().getDate() - 1))
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/. /g, '-')
      .replace('.', '');
  const before =
    (router.query?.before as string) ??
    new Date()
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/. /g, '-')
      .replace('.', '');
  const handleRefetch = useCallback(() => {
    // @ts-ignore
    setMutate({ after, before });
  }, [setMutate, after, before]);

  return (
    <Tooltip hasArrow label={t('Refresh Data')}>
      <Button variant={'outline'} onClick={handleRefetch} leftIcon={<RepeatIcon />} isLoading={isLoading} isDisabled={isLoading}>
        {t('Refresh')}
      </Button>
    </Tooltip>
  );
};

export default RefetchButton;
