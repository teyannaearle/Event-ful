const express = require("express");
const users = express.Router({ mergeParams: true });

// validation, error handling

const { getOneUser, createNewUser, allUsers } = require("../queries/users");

const db = require("../db/dbConfig");

// INDEX
users.get("/", async (req, res)  => {
  const allRegistered = await allUsers()
  console.log(allRegistered)
  res.status(200).json({
    success: true, 
    payload: allRegistered
  })
})

// SHOW ONE USER
users.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const oneUser = await getOneUser(email);
    console.log(oneUser);
    if (oneUser) {
      res.status(200).json({
        success: true,
        payload: oneUser,
      });
    } else {
      res.status(200).json({
        success: false,
        payload: `No registered user found with email ${email}`,
      });
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      payload: e,
    });
  }
});

// CREATE
users.post("/", async (req, res) => {
  let { email, displayName} = req.body;
  display_name = displayName
  try {
    const newUser = await createNewUser(email, display_name);
    if (newUser.user_id) {
      console.log("success creating new user");
      res.status(200).json({
        success: true,
        payload: newUser,
      });
    } else {
      throw `No user was created with email ${email}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
 }
});

module.exports = users;
