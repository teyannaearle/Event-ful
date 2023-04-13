const db = require("../db/dbConfig.js");
const pgp = require("pg-promise")();
let QRE = pgp.errors.QueryResultError;
let qrec = pgp.errors.queryResultErrorCode;


//INDEX
const allUsers = async () => {
  try {
    const everybody = await db.any("SELECT * FROM users")
    return everybody
  } catch (e) {
    return e
  }
}
//Show
const getOneUser = async (email) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE email=$1", [email]);
    return oneUser;
  } catch (err) {
    if (err instanceof QRE && err.code === qrec.noData) {
      return null;
    } else {
      console.log("query caught an error");
      console.log(err);
      return err;
    }
  }
};

//create
const createNewUser = async (email, display_name) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (email, display_name) VALUES ($1, $2) RETURNING *",
      [email, display_name]
    );
    return newUser;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getOneUser,
  createNewUser,
  allUsers
};
