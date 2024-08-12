import { Button, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { RepeatIcon } from '@chakra-ui/icons';
import { useSafePush } from '@/hooks';
import { useCallback } from 'react';
import { subWeeks } from 'date-fns';

interface RefetchButtonProps {
  isLoading: boolean;
  setMutate: () => void;
}

const RefetchButton = ({ isLoading, setMutate }: RefetchButtonProps) => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

  const after = router.query?.after as string ?? subWeeks(new Date(), 1).toISOString().split('T')[0];
  const before = router.query?.before as string ?? new Date().toISOString().split('T')[0];

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
