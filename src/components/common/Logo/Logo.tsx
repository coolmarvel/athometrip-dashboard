import { Center, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  const { t } = useTranslation();

  return (
    <Center>
      <Heading size={'md'} color={'primary.500'} cursor={onClick ? 'pointer' : 'default'} onClick={onClick} _hover={{ color: onClick ? 'primary.600' : 'primary.500' }}>
        {t('GAIA')}
      </Heading>
    </Center>
  );
};

export default Logo;
