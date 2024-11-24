import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";

const modules = ["Users", "Orders", "Products", "Reports"];

const actions = ["Read", "Write", "Delete"];

const PermissionMatrix = () => {
  const { permissions, fetchPermissions, roles, fetchRoles, updateRolePermissions } = useContext(AppContext);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolePermissions, setRolePermissions] = useState({});

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, [fetchPermissions, fetchRoles]);

  const handleRoleChange = (e) => {
    const roleId = e.target.value;
    const role = roles.find((r) => r.id === roleId);
    setSelectedRole(role);
    const initialPermissions = {};
    modules.forEach((module) => {
      initialPermissions[module] = {};
      actions.forEach((action) => {
        initialPermissions[module][action] = role.permissions.includes(`${module}:${action}`);
      });
    });
    setRolePermissions(initialPermissions);
  };

  const handleCheckboxChange = (module, action) => {
    setRolePermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }));
  };

  const handleSave = () => {
    const updatedPermissions = [];
    Object.keys(rolePermissions).forEach((module) => {
      Object.keys(rolePermissions[module]).forEach((action) => {
        if (rolePermissions[module][action]) {
          updatedPermissions.push(`${module}:${action}`);
        }
      });
    });
    updateRolePermissions(selectedRole.id, updatedPermissions);
  };

  return (
    <Box p={4}>
      <Box mb={4}>
        <label>Select Role: </label>
        <select onChange={handleRoleChange} value={selectedRole?.id || ""}>
          <option value="" disabled>
            -- Select Role --
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </Box>

      {selectedRole && (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Module</Th>
                {actions.map((action) => (
                  <Th key={action}>{action}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {modules.map((module) => (
                <Tr key={module}>
                  <Td>{module}</Td>
                  {actions.map((action) => (
                    <Td key={action}>
                      <Checkbox
                        isChecked={rolePermissions[module][action]}
                        onChange={() => handleCheckboxChange(module, action)}
                      />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button mt={4} colorScheme="teal" onClick={handleSave}>
            Save Permissions
          </Button>
        </>
      )}
    </Box>
  );
};

export default PermissionMatrix;
