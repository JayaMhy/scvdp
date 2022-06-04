const USERS = {
  111111: {
    name: "Вася",
    password: "123",
    admin: true,
  },
  123123: {
    name: "Петя",
    password: "123",
    admin: false,
  },
};

const PORT = 3000;
const PYTHON_BASE_URL = "http://127.0.0.1:5000";

module.exports = {
  USERS,
  PORT,
  PYTHON_BASE_URL,
};
