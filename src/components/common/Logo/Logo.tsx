import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  const { t } = useTranslation();

  return (
    <Heading
      width="35px"
      height="35px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      color="white"
      fontSize="xl"
      fontWeight="bold"
      onClick={onClick}
      cursor={onClick ? 'pointer' : 'default'}
      bgGradient="linear(to-tr, blue.500, teal.300)"
      _hover={{ color: onClick ? 'primary.600' : 'primary.500' }}
    >
      G
    </Heading>
  );
};

export default Logo;
