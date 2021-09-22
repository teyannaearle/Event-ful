const express = require("express");
const events = express.Router({ mergeParams: true });
// ----- STILL NEED TO DO REQ.BODY VALIDATION  ----
const {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  getLastEvent
} = require("../queries/events");

const db = require("../db/dbConfig");
///fix catch for first event in table/////
events.get("/last", async (req,res) => {
  const event = await getLastEvent();
  try {
    const event = await getLastEvent();

    if (event.event_id) {
      res.status(200).json({
        success: true,
        payload: event,
      });
    } else {
      throw event;
    }
  } catch (e) {
    res.status(404).json({
      success: true,
      payload: {event_id: 1}
    });
  }
})

events.get("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;

  try {
    const event = await getEvent(user_id, event_id);

    if (event.user_id) {
      res.status(200).json({
        success: true,
        payload: event,
      });
    } else {
      throw event;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

events.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const events = await getAllEvents(user_id);

    if (events[0].user_id) {
      res.status(200).json({
        success: true,
        message: events,
      });
    } else {
      throw events;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

events.post("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const newEvent = await createEvent(req.body, user_id);

    if (newEvent.user_id) {
      res.status(200).json({
        success: true,
        payload: newEvent,
      });
    } else {
      throw newEvent;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

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
      message: e,
    });
  }
});

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
      message: e,
    });
  }
});

module.exports = events;
