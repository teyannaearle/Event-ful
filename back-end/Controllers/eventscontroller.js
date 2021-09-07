const express = require("express");
const events = express.Router({ mergeParams: true });

const {
    getAllEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
  } = require("../queries/events.js");

  
  
  module.exports = events