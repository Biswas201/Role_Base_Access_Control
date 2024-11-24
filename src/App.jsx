import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionMatrix from "./components/PermissionMatrix";
import AppProvider from "./context/AppContext";
import "./services/mockApi"; 
import AuditLogs from "./components/AuditLogs";

const App = () => (
  <AppProvider>
    <Router>
      <Flex>
        <Sidebar />
        <Box flex="1">
          <Topbar />
          <Box p={4}>
            <Routes>
              <Route path="/" element={<Navigate to="/users" />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/permissions" element={<PermissionMatrix />} />
              <Route path="/audit-logs" element={<AuditLogs/>}/>
            </Routes>
          </Box>
        </Box>
      </Flex>
    </Router>
  </AppProvider>
);

export default App;
