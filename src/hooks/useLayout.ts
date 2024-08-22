import { createContext, useContext } from 'react';

import { Layout } from '@/types';

type LayoutContextType = {
  layout: Layout;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextType>({
  layout: 'horizontal',
  toggleLayout: () => {},
});

const useLayout = () => {
  const { layout, toggleLayout } = useContext(LayoutContext);

  return { Provider: LayoutContext.Provider, layout, toggleLayout };
};

export default useLayout;
