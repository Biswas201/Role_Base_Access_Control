import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { AppContext } from "../context/AppContext";
import ModalForm from "./ModalForm";
import ConfirmationDialog from './ConfirmationDialog';

const RoleManagement = () => {
  const { roles = [], fetchRoles, deleteRole } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

  const filteredRoles = Array.isArray(roles)
    ? roles.filter(
        (role) =>
          role.name.toLowerCase().includes(search) ||
          role.permissions.join(", ").toLowerCase().includes(search)
      )
    : [];

  const handleEdit = (role) => {
    setSelectedRole(role);
    onOpen();
  };

  const handleDelete = (role) => {
    setSelectedRole(role);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    deleteRole(selectedRole.id);
    onDeleteClose();
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Input
          placeholder="Search roles..."
          width="300px"
          onChange={handleSearch}
        />
        <Button
          colorScheme="teal"
          onClick={() => {
            setSelectedRole(null);
            onOpen();
          }}
        >
          Add Role
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Role Name</Th>
            <Th>Assigned Permissions</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRoles.map((role) => (
            <Tr key={role.id}>
              <Td>{role.name}</Td>
              <Td>{role.permissions.join(", ")}</Td>
              <Td>
                <IconButton
                  aria-label="Edit Role"
                  icon={<EditIcon />}
                  size="sm"
                  mr={2}
                  onClick={() => handleEdit(role)}
                />
                <IconButton
                  aria-label="Delete Role"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(role)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for Add/Edit Role */}
      <ModalForm
        isOpen={isOpen}
        onClose={onClose}
        type="role"
        role={selectedRole}
      />

      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={confirmDelete}
        title="Delete Role"
        message={`Are you sure you want to delete the role "${selectedRole?.name}"?`}
      />
    </Box>
  );
};

export default RoleManagement;
