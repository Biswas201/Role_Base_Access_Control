import { Box, Text, VStack, Link, useBreakpointValue, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from "@chakra-ui/react";
import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

const Sidebar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const SidebarContent = (
    <Box bg="gray.700" color="white" minH="100vh" p={4} width="250px">
      <VStack align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          RBAC DASHBOARD
        </Text>
        <NavLink to="/users" onClick={onClose}>
          <Link>Users</Link>
        </NavLink>
        <NavLink to="/roles" onClick={onClose}>
          <Link>Roles</Link>
        </NavLink>
        <NavLink to="/permissions" onClick={onClose}>
          <Link>Permissions</Link>
        </NavLink>
        <NavLink to="/audit-logs" onClick={onClose}>
          <Link>Audit Logs</Link>
        </NavLink>
      </VStack>
    </Box>
  );

  return (
    <>
     {isMobile ? (
      <>
      <IconButton
       icon={<HamburgerIcon/>}
       onClick={() => setIsOpen(true)}
       m={4}
       aria-label="Open Menu"
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerCloseButton/>
          <DrawerBody>
            {SidebarContent}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </>
     ): (
      SidebarContent
     )}
    </>
  );
};

export default Sidebar;
