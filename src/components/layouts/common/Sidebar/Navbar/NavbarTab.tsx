import { Nav } from '@/constants';
import { useAlphaColor, useSafePush } from '@/hooks';
import { Collapse, Center, Flex, Icon, ListItem, Text, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NavbarTabProps {
  nav: Nav;
  isActivated: boolean;
}

const NavbarTab = ({ nav, isActivated }: NavbarTabProps) => {
  const { t } = useTranslation();
  const alphaColor = useAlphaColor();
  const { push } = useSafePush();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    // 하위 항목이 있고, collapsible이 활성화되어 있을 경우에만 토글 동작
    if (nav.children && nav.collapsible) setIsOpen(!isOpen);
    else {
      // 그 외의 경우는 페이지 이동
      push({ pathname: nav.pathname, query: nav.query });
    }
  };

  return (
    <ListItem key={nav.label}>
      <Flex
        bgColor={isActivated ? alphaColor(100) : 'transparent'}
        align={'center'}
        p={'4'}
        gap={'4'}
        borderRadius={'md'}
        cursor={'pointer'}
        _hover={{ bgColor: alphaColor(50) }}
        // onClick={() => push({ pathname: nav.pathname, query: nav.query })}
        onClick={handleClick}
      >
        <Tooltip hasArrow label={t(nav.label)} display={{ base: 'none', lg: 'block', xl: 'none' }}>
          <Center w={'8'} h={'8'} bgColor={isActivated ? 'primary.500' : 'transparent'} border={'1px solid'} borderColor={isActivated ? 'transparent' : 'primary.500'} borderRadius={'md'}>
            <Icon as={nav.icon} color={isActivated ? 'white' : 'primary.500'} />
          </Center>
        </Tooltip>
        <Text display={{ base: 'initial', lg: 'none', xl: 'initial' }}>{t(nav.label)}</Text>
      </Flex>
      {nav.collapsible && (
        <Collapse in={isOpen} animateOpacity>
          <Flex direction="column" pl={4}>
            {nav.children?.map((child) => (
              <NavbarTab key={child.label} nav={child} isActivated={isActivated} />
            ))}
          </Flex>
        </Collapse>
      )}
    </ListItem>
  );
};

export default NavbarTab;
