const express = require("express");
const products = express.Router({ mergeParams: true });

const {
    getAllEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
  } = require("../queries/events.js");

  

