import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";

const ModalForm = ({ isOpen, onClose, type, user, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const toast = useToast();

  useEffect(() => {
    setFormData(
      user
        ? { ...user }
        : {
            name: "",
            email: "",
            password: "",
            role: "",
            status: "Active",
          }
    );
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Validation error",
        description: "Name and Email are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? "Edit User" : "Add User"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              placeholder="Select role"
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status || "Active"}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            {user ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
