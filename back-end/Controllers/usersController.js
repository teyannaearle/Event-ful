const express = require("express");
const users = express.Router({ mergeParams: true });

// validation, error handling

const {
getOneUser,
createNewUser
} = require("../queries/users");

const db = require("../db/dbConfig");



// SHOW ONE USER
users.get("/", async (req, res) => {
  console.log("get one user")
  const { email } = req.body;
  try {
    const oneUser = await getOneUser(email);
    if (oneUser.user_id) {
      res.status(200).json({
        success: true,
        payload: oneUser,
      });
    } else {
      throw `No registered user found with email ${email}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// CREATE
users.post("/", async (req, res) => {
  console.log("create new user")
  const { email, password } = req.body;
  
  try {
    const newUser = await createNewUser(email, password);

    if (newUser.user_id) {
      res.status(200).json({
        success: true,
        payload: newUser,
      });
    } else {
      throw `No vendor was created with email ${email}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});


module.exports = users;
