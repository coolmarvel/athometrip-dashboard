import { useAlphaColor } from '@/hooks';
import { Box, Divider } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const alphaColor = useAlphaColor();

  return (
    <Box as={'aside'} display={isOpen ? 'flex' : 'none'} flexDirection={'column'} bgColor={alphaColor(50)} w={{ base: '64', lg: '24', xl: '64' }} p={'4'} h={'100vh'}>
      <SidebarHeader />
      <Divider />
      <Box overflowY="auto" flex="1">
        <Navbar />
      </Box>
      <SidebarFooter />
    </Box>
  );
};

export default Sidebar;
