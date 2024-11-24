import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuidv4 } from "uuid";

// Initialize Axios Mock Adapter
const mock = new MockAdapter(axios, { delayResponse: 500 });

// Initial Mock Data
let users = [
  {
    id: uuidv4(),
    name: "Anurup",
    email: "anu@gmail.com",
    role: "1",
    status: "Active",
  },
  {
    id: uuidv4(),
    name: "Biswas",
    email: "bis@gmail.com",
    role: "2",
    status: "Inactive",
  },
];

let roles = [
  {
    id: "1",
    name: "Admin",
    permissions: ["Users:Read", "Users:Write", "Users:Delete"],
  },
  { id: "2", name: "Editor", permissions: ["Users:Read", "Users:Write"] },
];

let permissions = [
  { id: "1", module: "Users", actions: ["Read", "Write", "Delete"] },
  { id: "2", module: "Orders", actions: ["Read", "Write", "Delete"] },
  { id: "3", module: "Products", actions: ["Read", "Write", "Delete"] },
  { id: "4", module: "Reports", actions: ["Read", "Write", "Delete"] },
];

// Users Endpoints
mock.onGet("/users").reply(200, users);

mock.onPost("/users").reply((config) => {
  const newUser = JSON.parse(config.data);
  newUser.id = uuidv4();
  users.push(newUser);
  return [201, newUser];
});

mock.onPut(/\/users\/\w+/).reply((config) => {
  const id = config.url.split("/").pop();
  const updatedUser = JSON.parse(config.data);
  users = users.map((user) => (user.id === id ? updatedUser : user));
  return [200, updatedUser];
});

mock.onDelete(/\/users\/\w+/).reply((config) => {
  const id = config.url.split("/").pop();
  users = users.filter((user) => user.id !== id);
  return [204];
});

// Roles Endpoints
mock.onGet("/roles").reply(200, roles);

mock.onPost("/roles").reply((config) => {
  const newRole = JSON.parse(config.data);
  newRole.id = uuidv4();
  roles.push(newRole);
  return [201, newRole];
});

mock.onPut(/\/roles\/\w+/).reply((config) => {
  const id = config.url.split("/").pop();
  const updatedRole = JSON.parse(config.data);
  roles = roles.map((role) => (role.id === id ? updatedRole : role));
  return [200, updatedRole];
});

mock.onDelete(/\/roles\/\w+/).reply((config) => {
  const id = config.url.split("/").pop();
  roles = roles.filter((role) => role.id !== id);
  return [204];
});

// Permissions Endpoints
mock.onGet("/permissions").reply(200, permissions);

export const getUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
export default mock;
