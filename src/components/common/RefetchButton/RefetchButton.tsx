import { Button, Spinner, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { RepeatIcon } from '@chakra-ui/icons';
import { useCallback } from 'react';
import { subWeeks } from 'date-fns';

import { useQueryKeyParams, useSafePush } from '@/hooks';
import { useRefetchTopOfTheRockByPage } from '@/apis';
import { ApiRoutes } from '@/constants';
import { toUrl } from '@/utils';

const RefetchButton = () => {
  const { router } = useSafePush();

  const after = router.query.after ? router.query.after : subWeeks(new Date(), 1).toISOString().split('T')[0];
  const before = router.query.before ? router.query.before : new Date().toISOString().split('T')[0];

  const { t } = useTranslation();
  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.TopOfTheRock));
  const { mutate: refetchTopOfTheRock, isLoading } = useRefetchTopOfTheRockByPage(queryKeyParams);

  const handleRefetch = useCallback(() => {
    // @ts-ignore
    refetchTopOfTheRock({ after, before });
  }, [refetchTopOfTheRock, after, before]);

  return (
    <Tooltip hasArrow label={t('Refresh Data')}>
      <Button variant={'outline'} onClick={handleRefetch} leftIcon={<RepeatIcon />} isLoading={isLoading} isDisabled={isLoading}>
        {t('Refresh')}
      </Button>
    </Tooltip>
  );
};

export default RefetchButton;