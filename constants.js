const USERS = {
  123123: {
    name: "Jaya",
    password: "123",
    admin: true,
    lead: true,
  },
  456456: {
    name: "Maya",
    password: "123",
    admin: false,
    leadDeveloper: false,
  },
  890890: {
    name: "lead",
    password: "123",
    admin: false,
    lead: true,
  },
};

const PORT = 3000;
const PYTHON_BASE_URL = "http://127.0.0.1:5000";

module.exports = {
  USERS,
  PORT,
  PYTHON_BASE_URL,
};
