// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const bookedController = require("./controllers/bookedController.js")
const checklistController = require("./controllers/checklistController.js")
const eventsController = require("./controllers/eventsController.js")
const favoritesController = require("./controllers/favoritesController.js")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/events", eventsController)

app.use("/checklist", checklistController)

app.use("/favorites", favoritesController)

app.use("/booked", bookedController)

app.get("*", (req,res)=>{
  res.send("page not found")
})


/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////
const db = require("./db/dbConfig.js");

app.get("/test", async (req, res) => {
  try {
    const allDays = await db.any("SELECT * FROM test");
    res.json(allDays);
  } catch (err) {
    res.json(err);
  }
});

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////

// EXPORT
module.exports = app;
