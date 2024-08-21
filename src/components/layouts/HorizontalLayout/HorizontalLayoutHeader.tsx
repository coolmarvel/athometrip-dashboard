import { useTranslation } from 'react-i18next';
import { RiLoginBoxLine, RiLogoutBoxRLine, RiSettingsLine } from 'react-icons/ri';
import { Box, Flex, Icon, IconButton, Text, Tooltip, useColorMode, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, VStack } from '@chakra-ui/react';

import { toUrl } from '@/utils';
import { useSafePush } from '@/hooks';
import { useGetMe, useSignout } from '@/apis';
import { PageRoutes, styles } from '@/constants';
import { ColorToggle, LanguageToggle } from '@/components/layouts/common/Sidebar';
import { SubHeader } from '@/components/layouts/common';
import { AiOutlineUser } from 'react-icons/ai';

export const HorizontalLayoutHeader = () => {
  const { t } = useTranslation();
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  const { mutate: signout } = useSignout();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="sticky" top="0" zIndex="sticky" bg={colorMode === 'light' ? '#ffffff' : '#191F2B'} width="full" px={3} py={2}>
      <Flex justify="space-between" align="center">
        <SubHeader />
        <Box></Box>
        <Flex align="center" gap="2">
          {me ? (
            <Flex gap={'4'} align={'center'} overflow={'hidden'}>
              {/*<Text display={{ base: 'block', lg: 'none', xl: 'block' }} {...styles.ellipsis}>*/}
              {/*  {`${t('Welcome')} `}*/}
              {/*  <Text as={'b'} color={'primary.500'}>*/}
              {/*    {me?.name}*/}
              {/*  </Text>*/}
              {/*</Text>*/}
              {/*<Tooltip hasArrow label={t('Sign Out')}>*/}
              {/*  <IconButton aria-label="signout" onClick={() => signout()}>*/}
              {/*    <Icon as={RiLogoutBoxRLine} />*/}
              {/*  </IconButton>*/}
              {/*</Tooltip>*/}
              {/*<IconButton aria-label={'signout'}>*/}
              {/*  <Icon as={AiOutlineUser} fontSize={'1rem'} />*/}
              {/*</IconButton>*/}

              <Menu>
                <MenuButton as={IconButton} aria-label={'User menu'}>
                  <Icon as={AiOutlineUser} fontSize={'1rem'} />
                </MenuButton>
                <MenuList>
                  <VStack spacing={0} align="start" px={3} py={1}>
                    <Box fontWeight="bold">{me?.name}</Box>
                    <Box fontSize="sm">{me?.email}</Box>
                  </VStack>
                  <MenuDivider />
                  <MenuItem icon={<Icon as={RiSettingsLine} />}>
                    {t('Settings')}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => signout()} icon={<Icon as={RiLogoutBoxRLine} />}>{t('Signout')}</MenuItem>
                </MenuList>
              </Menu>
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
          <ColorToggle colorMode={colorMode} toggleColorMode={toggleColorMode} />
          <LanguageToggle />
        </Flex>
      </Flex>
    </Box>
  )
    ;
};
