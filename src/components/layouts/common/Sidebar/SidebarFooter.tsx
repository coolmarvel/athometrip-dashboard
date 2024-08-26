import React from 'react';
import { Center } from '@chakra-ui/react';

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, collapsed, ...rest }) => {

  return (
    <Center as={'footer'} mt={'auto'} gap={'4'} py={'4'}></Center>
  );
};
