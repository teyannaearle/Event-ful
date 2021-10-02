const db = require("../db/dbConfig.js");

//Show
const getOneUser = async (email) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE email=$1", [email]);
    return oneUser;
  } catch (err) {
    return err;
  }
};

//create
const createNewUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [user.email, user.password]
    );
    return newUser;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getOneUser,
  createNewUser,
};
