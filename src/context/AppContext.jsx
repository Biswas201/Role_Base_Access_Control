import axios from "axios";
import { createContext, useCallback, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [auditLogs, setAuditLogs] = useState([
    {id : 1, actions: "Login", details: "User logged in", timestamp: "2024-11-24"},
    {id: 2, actions: "Update", details: "User updated profile", timestamp: "2024-11-24"},
  ]);

  const fetchUsers = useCallback(async () => {
    const response = await axios.get("/users");
    setUsers(response.data);
  }, []);

  const fetchRoles = useCallback(async () => {
    const response = await axios.get("/roles");
    setRoles(response.data);
  }, []);

  const fetchPermissions = useCallback(async () => {
    const response = await axios.get("/permissions");
    setPermissions(response.data);
  }, []);

  const addAuditLog = (action, details) => {
    const newLog = {
      id: uuidv4(),
      action,
      details,
      timestamp: new Date().toLocaleString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addUser = async (user) => {
    const response = await axios.post("/users", user);
    setUsers((prev) => [...prev, response.data]);
    console.log(`User Added: ${response.data.name}`);
  };

  const updateUser = async (updatedUser) => {
    const response = await axios.put(`/user/${updatedUser.id}`, updatedUser);
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? response.data : user))
    );
  };

  const deleteUser = async (userId) => {
    await axios.delete(`/users/${userId}`);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const addRole = async (role) => {
    const response = await axios.post("/roles", role);
    setRoles((prev) => [...prev, response.data]);
  };

  const updateRole = async (updatedRole) => {
    const response = await axios.put(`/roles/${updatedRole.id}`, updatedRole);
    setRoles((prev) =>
      prev.map((role) => (role.id === updatedRole.id ? response.data : role))
    );
  };

  const updateRolePermissions = async (roleId, permissions) => {
    const role = roles.find((r) => r.id === roleId);
    const updatedRole = { ...role, permissions };
    const response = await axios.put(`/roles/${roleId}`, updatedRole);
    setRoles((prev) => prev.map((r) => (r.id === roleId ? response.data : r)));
  };

  const deleteRole = async (roleId) => {
    await axios.delete(`/roles/${roleId}`);
    setRoles((prev) => prev.filter((role) => role.id !== roleId));
  };

  return (
    <AppContext.Provider
      value={{
        users,
        roles,
        permissions,
        auditLogs,
        fetchUsers,
        fetchRoles,
        fetchPermissions,
        addAuditLog,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
        updateRolePermissions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
