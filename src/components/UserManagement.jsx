import React, { useEffect, useState } from "react";
import { getUsers } from "./../services/mockApi";
import { Box, Button, Input, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import ModalForm from "./ModalForm";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
  );

  const handleAddUser = () => {
    setSelectedUser(null); 
    onOpen();
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); 
    onOpen();
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleFormSubmit = (formData) => {
    if (selectedUser) {
      
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      
      setUsers([...users, { ...formData, id: new Date().getTime().toString() }]);
    }
    onClose();
  };

  return (
    <Box p={4}>
      <Input placeholder="Search users...." mb={4} onChange={handleSearch} />
      <Button colorScheme="teal" mb={4} onClick={handleAddUser}>
        Add User
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.status}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => handleEditUser(user)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        type="user"
        user={selectedUser}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default UserManagement;
