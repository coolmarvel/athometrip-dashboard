import { useMemo } from 'react';
import { Link } from '@chakra-ui/next-js';
import { useTranslation } from 'react-i18next';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { PageRoutes, findNavInHierarchy } from '@/constants';
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md';

import { toUrl } from '@/utils';
import { useSafePush } from '@/hooks';

const SubHeader = () => {
  const { router, push } = useSafePush();
  const { t } = useTranslation();

  const hierarchy = useMemo(() => findNavInHierarchy(router.pathname), [router.pathname]);

  return (
    <>
      {hierarchy.length > 0 && (
        <Flex gap={'2'}>
          <Flex gap={'2'} align={'center'}>
            <Icon as={MdHome} onClick={() => push(toUrl(PageRoutes.Home))} cursor={'pointer'} />
            <Icon as={MdKeyboardArrowRight} />
          </Flex>
          {hierarchy.map((nav, idx) => (
            <Flex key={nav.label} gap={'2'} align={'center'}>
              {idx !== hierarchy.length - 1 ? (
                <>
                  <Text fontSize={'sm'}>{t(nav.label)}</Text>
                  {idx !== hierarchy.length - 1 && <Icon as={MdKeyboardArrowRight} />}
                </>
              ) : (
                <Text color={'primary.500'} fontSize={'sm'} fontWeight={'bold'}>
                  {t(nav.label)}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};

export default SubHeader;
