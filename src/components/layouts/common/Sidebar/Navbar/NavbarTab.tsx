// NavbarTab.tsx
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Collapse, Center, Flex, Icon, ListItem, Text, Tooltip, UnorderedList } from '@chakra-ui/react';

import { Nav } from '@/constants';
import { useAlphaColor, useSafePush } from '@/hooks';
import { useCollapseStore } from '@/stores';

interface NavbarTabProps {
  nav: Nav;
  isActivated: boolean;
}

const NavbarTab = ({ nav, isActivated }: NavbarTabProps) => {
  const { t } = useTranslation();
  const { push } = useSafePush();
  const alphaColor = useAlphaColor();

  const { isOpen, setIsOpen } = useCollapseStore(['isOpen', 'setIsOpen']);
  const isOpenThisTab = isOpen[nav.label] || false;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (nav.children && nav.collapsible) setIsOpen(nav.label);
    else push({ pathname: nav.pathname, query: nav.query });
  };

  return (
    <ListItem key={nav.label} onClick={handleClick}>
      <Flex bgColor={isActivated ? alphaColor(100) : 'transparent'} align={'center'} p={'4'} gap={'4'} borderRadius={'md'} cursor={'pointer'} _hover={{ bgColor: alphaColor(50) }}>
        <Tooltip hasArrow label={t(nav.label)} display={{ base: 'none', lg: 'block', xl: 'none' }}>
          <Center w={'8'} h={'8'} bgColor={isActivated ? 'primary.500' : 'transparent'} border={'1px solid'} borderColor={isActivated ? 'transparent' : 'primary.500'} borderRadius={'md'}>
            <Icon as={nav.icon} color={isActivated ? 'white' : 'primary.500'} />
          </Center>
        </Tooltip>
        <Text display={{ base: 'initial', lg: 'none', xl: 'initial' }}>{t(nav.label)}</Text>
        {nav.collapsible && <Icon as={isOpenThisTab ? ChevronUpIcon : ChevronDownIcon} />}
      </Flex>
      {nav.collapsible && (
        <Collapse in={isOpenThisTab} animateOpacity>
          <UnorderedList style={{ listStyle: 'none' }}>
            {nav.children?.map((child) => (
              <NavbarTab key={child.label} nav={child} isActivated={isActivated} />
            ))}
          </UnorderedList>
        </Collapse>
      )}
    </ListItem>
  );
};

export default NavbarTab;
