import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const AuditLogs = () => {
  const { auditLogs } = useContext(AppContext);

  const logs = auditLogs || [];

  return (
    <Box p={4}>
      <Box mb={4}>
        <strong>Audit Logs</strong>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Actions</Th>
            <Th>Details</Th>
            <Th>Timestamp</Th>
          </Tr>
        </Thead>
        <Tbody>
          {logs.map((log) => (
            <Tr key={log.id}>
              <Td>{log.actions}</Td>
              <Td>{log.details}</Td>
              <Td>{log.timestamp}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AuditLogs;
