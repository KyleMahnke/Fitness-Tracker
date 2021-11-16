const client = require("./client");
const bcrypt = require('bcrypt');

// database functions

// user functions
async function createUser({ username, password }) {
  const SALT_COUNT = 10;

bcrypt.hash(password, SALT_COUNT, function(err, hashedPassword) {
  createUser({
    username,
    password: hashedPassword // not the plaintext
  });
});
  
}

async function getUser({ username, password }) {
  const user = await getUserByUserName(username);
const hashedPassword = user.password;

bcrypt.compare(password, hashedPassword, function(err, passwordsMatch) {
  if (passwordsMatch) {
    // return the user object (without the password)
  } else {
    throw SomeError;
  }
});
}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
