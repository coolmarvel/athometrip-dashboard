import { useCallback, useEffect, useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

import { useLayout } from '@/hooks';
import { Layout } from '@/types';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const { Provider } = useLayout();
  const [layout, setLayout] = useState<Layout>('horizontal');

  const isMobile = useBreakpointValue({ base: true, lg: false })!;

  useEffect(() => {
    const layout = localStorage.getItem('layout') as Layout;

    if (layout) setLayout(layout);
  }, []);

  const toggleLayout = useCallback(() => {
    setLayout((prev) => {
      const nextLayout = prev === 'horizontal' ? 'vertical' : 'horizontal';
      localStorage.setItem('layout', nextLayout);

      return nextLayout;
    });
  }, []);

  return <Provider value={{ layout: isMobile ? 'mobile' : layout, toggleLayout }}>{children}</Provider>;
};

export default LayoutProvider;
