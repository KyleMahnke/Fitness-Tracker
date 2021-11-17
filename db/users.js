const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// database functions

// user functions

const createUser = async (user) => {
  const { username, password } = user;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  const {
    rows: [newUser],
  } = await client.query(
    `
    INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
    [username, hashedPassword]
  );
  return newUser;
};

async function getUser({ username, password }) {
  const user = await getUserByUserName(username);
  const hashedPassword = user.password;

  bcrypt.compare(password, hashedPassword, function (err, passwordsMatch) {
    if (passwordsMatch) {
      // return the user object (without the password)
    } else {
      throw SomeError;
    }
  });
}

async function getUserById(userId) {}

async function getUserByUsername(userName) {}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
