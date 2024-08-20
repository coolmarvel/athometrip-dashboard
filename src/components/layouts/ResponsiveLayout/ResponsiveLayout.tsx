import { useMemo } from 'react';

import { useLayout } from '@/hooks';
import { MobileLayout } from '../MobileLayout';
import { VerticalLayout } from '../VerticalLayout';
import { HorizontalLayout } from '../HorizontalLayout';

interface ResponsiveLayoutProps {
  children?: React.ReactNode;
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  const { layout } = useLayout();

  const Layout = useMemo(() => {
    switch (layout) {
      case 'horizontal':
        return HorizontalLayout;
      case 'vertical':
        return VerticalLayout;
      case 'mobile':
        return MobileLayout;
      default:
        throw new Error(`Invalid layout: ${layout}`);
    }
  }, [layout]);

  return <Layout>{children}</Layout>;
};

export default ResponsiveLayout;
