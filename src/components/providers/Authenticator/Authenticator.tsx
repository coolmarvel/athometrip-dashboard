import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useSafePush } from '@/hooks';
import { Api, useGetMe } from '@/apis';
import { useModalStore } from '@/stores';
import { Unauthorized } from '@/components';
import { PageRoutes, isExistPage, isWhiteList } from '@/constants';

const Authenticator = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();
  const { data, isFetching } = useGetMe();
  const { openAlert, closeAlert } = useModalStore(['openAlert', 'closeAlert']);

  useEffect(() => {
    if (isFetching) return;

    if (data) Api.addToken(data.userId);
    else Api.removeToken();
  }, [data, isFetching]);

  useEffect(() => {
    if (!isExistPage(router.pathname) || isWhiteList(router.pathname) || isFetching) return;

    if (!data) {
      push({
        pathname: PageRoutes.Signin, query: { redirect: router.asPath },
      })?.then(() => {
        openAlert({ title: t('Unauthorized'), content: <Unauthorized /> });
      });
    }
  }, [closeAlert, data, isFetching, openAlert, push, router, t]);

  return <></>;
};

export default Authenticator;
