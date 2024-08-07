import React from 'react';
import { useSafePush } from '@/hooks';
import { useGetMe, useSignout } from '@/apis';
import { useTranslation } from 'react-i18next';
import { Center, Flex, Icon, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { PageRoutes, styles } from '@/constants';
import { RiLoginBoxLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { toUrl } from '@/utils';

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, collapsed, ...rest }) => {
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  const { mutate: signout } = useSignout();
  const { t } = useTranslation();

  return (
    <Center as={'footer'} mt={'auto'} gap={'4'} py={'4'}>
      {me ? (
        <Flex gap={'4'} align={'center'} overflow={'hidden'}>
          <Text display={{ base: 'block', lg: 'none', xl: 'block' }} {...styles.ellipsis}>
            {`${t('Welcome')} `}
            <Text as={'b'} color={'primary.500'}>
              {me?.name}
            </Text>
          </Text>
          <Tooltip hasArrow label={t('Sign Out')}>
            <IconButton aria-label="signout" onClick={() => signout()}>
              <Icon as={RiLogoutBoxRLine} />
            </IconButton>
          </Tooltip>
        </Flex>
      ) : (
        <>
          <Text display={{ base: 'block', lg: 'none', xl: 'block' }}>{t('Not Signed In')}</Text>
          <Tooltip hasArrow label={t('Sign In')}>
            <IconButton aria-label="signin" onClick={() => push(toUrl(PageRoutes.Signin))}>
              <Icon as={RiLoginBoxLine} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Center>
  );
};