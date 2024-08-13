import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiMoon, FiSun } from 'react-icons/fi';
import { Icon, useColorMode } from '@chakra-ui/react';

import ChangerBase from '@/components/common/Changer/ChangerBase';

interface ColorToggleProps {
  colorMode: 'light' | 'dark',
  toggleColorMode: () => void;
}

const ColorToggle: React.FC<ColorToggleProps> = ({ colorMode, toggleColorMode }) => {
  // const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();

  return (
    <ChangerBase ariaLabel={'Toggle color mode'} label={colorMode === 'light' ? t('Dark Mode') : t('Light Mode')} onToggle={toggleColorMode}>
      <Icon as={colorMode === 'light' ? FiMoon : FiSun} />
    </ChangerBase>
  );
};

export default ColorToggle;
