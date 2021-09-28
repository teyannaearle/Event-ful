const db = require("../db/dbConfig");

const getAllEvents = async (user_id) => {
  try {
    const events = await db.any(
      "SELECT * FROM events WHERE user_id=$1 ORDER BY event_name ASC",
      user_id
    );
    return events;
  } catch (err) {
    return err;
  }
};

const getEvent = async (user_id, event_id) => {
  try {
    const event = await db.one(
      "SELECT * FROM events WHERE user_id=$1 AND event_id=$2",
      [user_id, event_id]
    );
    return event;
  } catch (err) {
    return err;
  }
};

const createEvent = async (body, user_id) => {
  try {
    const newEvent = await db.one(
      "INSERT INTO events (event_name , event_budget, event_date, event_time, user_id) VALUES($1, $2, $3, $4, $5)  RETURNING *",
      [
        body.event_name,
        body.event_budget,
        body.event_date,
        body.event_time,
        user_id,
      ]
    );
    return newEvent;
  } catch (err) {
    return err;
  }
};

const deleteEvent = async (user_id, event_id) => {
  try {
    const deletedEvent = await db.one(
      "DELETE FROM events WHERE user_id=$1 AND event_id=$2 RETURNING *",
      [user_id, event_id]
    );
    return deletedEvent;
  } catch (err) {
    return err;
  }
};

const updateEvent = async (body, user_id, event_id) => {
  try {
    const updated = await db.one(
      "UPDATE events SET event_name=$1 , event_zip=$2 , event_budget=$3 , event_date=$4 , event_time=$5 WHERE user_id=$6 AND event_id=$7 RETURNING *",
      [
        body.event_name,
        body.event_budget,
        body.event_date,
        body.event_time,
        user_id,
        event_id,
      ]
    );
    return updated;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent
};
