const express = require("express");
const users = express.Router({ mergeParams: true });

// validation, error handling

const { getOneUser, createNewUser } = require("../queries/users");

const db = require("../db/dbConfig");

// SHOW ONE USER
users.get("/:email", async (req, res) => {

  const { email } = req.params;
  try {
    const oneUser = await getOneUser(email);
    console.log(oneUser)
    if (oneUser) {
      console.log(`found one user ${oneUser.email}`)
      res.status(200).json({
        success: true,
        payload: oneUser,
      });
    } else {
      console.log("user not found")
      // throw `No registered user found with email ${email}`;
      res.status(200).json({
        success: false,
        payload: `No registered user found with email ${email}`,
      });
    }
  } catch (e) {
    console.log("could not find one user, line 27")
    console.log(e)
    res.status(404).json({
      success: false,
      payload: e,
    });
  }
});

// CREATE
users.post("/", async (req, res) => {
  console.log("create new user");
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const newUser = await createNewUser(email, password);

    if (newUser.user_id) {
      console.log("success creating new user");
      res.status(200).json({
        success: true,
        payload: newUser,
      });
    } else {
      console.log("error on line 52");
      throw `No vendor was created with email ${email}`;
    }
  } catch (e) {
    console.log("error on line 55");
    console.log(e);
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

module.exports = users;
