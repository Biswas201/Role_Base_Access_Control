import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

const Topbar = () => {
  const { toggleColorMode } = useColorMode();

  const handleLogout = () => {
    console.log("Logged Out");
  };

  return (
    <Box bg="gray.800" color="white" px={4} py={3}>
      <Flex alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          Admin Dashboard
        </Text>
        <Spacer />
        <Flex alignItems="center">
          <Button onClick={toggleColorMode} size="sm" mr={4}>
            Toggle Mode
          </Button>
          <Menu>
            <MenuButton>
              <Avatar size="sm" name="Anurup Biswas" src="" bg="green.500"/>
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Topbar;
