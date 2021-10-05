const express = require("express");
const events = express.Router({ mergeParams: true });
// ----- STILL NEED TO DO REQ.BODY VALIDATION  ----
const {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../queries/events");

const db = require("../db/dbConfig");

// INDEX

events.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const events = await getAllEvents(user_id);

  res.status(200).json({
    success: true,
    message: events
  });
});

// SHOW

events.get("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;

  try {
    const event = await getEvent(user_id, event_id);
    if (event.user_id) {
      res.status(200).json({
        success: true,
        payload: event
      });
    } 
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e
    });
  }
});

// POST 

events.post("/:user_id", async (req, res) => {
  const { user_id } = req.params;
console.log(user_id)
  try {
    const newEvent = await createEvent(req.body, user_id);
console.log(newEvent)
    if (newEvent.user_id) {
      res.status(200).json({
        success: true,
        payload: newEvent
      });
    } else {
      throw newEvent;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e
    });
  }
});

// DELETE 

events.delete("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;

  try {
    const deleted = await deleteEvent(user_id, event_id);
    if (deleted.user_id) {
      res.status(200).json({ success: true, payload: deleted });
    } else {
      throw deleted;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e
    });
  }
});

// PUT

events.put("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  try {
    const updated = await updateEvent(req.body, user_id, event_id);

    if (updated.user_id) {
      res.status(200).json({
        success: true,
        payload: updated,
      });
    } else {
      throw updated;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e
    });
  }
});

module.exports = events;
