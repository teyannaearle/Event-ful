// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const middleware = require("./middleware")
const bookedController = require("./Controllers/bookedcontroller.js")
const checklistController = require("./Controllers/checklistcontroller.js")
const eventsController = require("./Controllers/eventController.js")
const favoritesController = require("./Controllers/favoritescontroller.js")
const usersController = require("./Controllers/usersController")


// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors({
  origin: ["https://eventful-application.netlify.app", "http://localhost:3000"]
}));
app.use(express.json()); // Parse incoming JSON
// app.use(middleware.decodeToken)


// ROUTES
app.get("/", (req, res) => {
  res.send("Event(ful) DB");
});

app.use(middleware.decodeToken)

app.use("/events", eventsController)

app.use("/checklist", checklistController)

app.use("/favorites", favoritesController)

app.use("/booked", bookedController)

app.use("/users", usersController)


app.get("*", (req,res)=>{
  res.send("page not found")
})


// EXPORT
module.exports = app;
