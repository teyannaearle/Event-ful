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
// app.use(cors({
//   origin: ["https://eventful-application.netlify.app", "http://localhost:3000"]
// }));

const corsOptions = {
  origin: 'https://eventful-application.netlify.app', // specify your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if you’re using cookies or other credentials
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});


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
