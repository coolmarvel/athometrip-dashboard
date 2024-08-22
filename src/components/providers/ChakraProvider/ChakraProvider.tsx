import { useCallback, useEffect, useState } from 'react';
import { ChakraProvider as _ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

import getTheme from './theme';
import { PrimaryColor } from '@/types';
import { usePrimaryColor } from '@/hooks';

interface ChakraProviderProps {
  children: React.ReactNode;
}

const { ToastContainer } = createStandaloneToast();

const ChakraProvider = ({ children }: ChakraProviderProps) => {
  const { Provider } = usePrimaryColor();
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>('linkedin');

  useEffect(() => {
    const primaryColor = localStorage.getItem('primaryColor') as PrimaryColor;
    if (primaryColor) setPrimaryColor(primaryColor);
  }, []);

  const changePrimaryColor = useCallback<(primaryColor: PrimaryColor) => void>((primaryColor) => {
    setPrimaryColor(primaryColor);
    localStorage.setItem('primaryColor', primaryColor);
  }, []);

  return (
    // https://github.com/chakra-ui/chakra-ui-docs/issues/1586
    <Provider value={{ primaryColor, changePrimaryColor }}>
      <_ChakraProvider theme={getTheme(primaryColor)} cssVarsRoot="body">
        <ToastContainer />
        {children}
      </_ChakraProvider>
    </Provider>
  );
};

export default ChakraProvider;
