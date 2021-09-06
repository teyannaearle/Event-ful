const db = require("../db/dbConfig.js");

//index
const getAllEvents = async () => {
  try {
    const allEvents = await db.any(
      "SELECT * FROM events ORDER BY name ASC"
    );
    return allEvent
s;
  } catch (err) {
    return err;
  }
};
//Show
const getEvent = async (id) => {
  try {
    const oneEvent
 = await db.one("SELECT * FROM Events WHERE id=$1", id);
    return oneEvent
;
  } catch (err) {
    return err;
  }
};
//create
const createEvent = async (Event
) => {
  try {
    const newEvent
 = await db.one(
      "INSERT INTO Events (name, price, category, is_popular, img) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        Event
    .name,
        Event
    .price,
        Event
    .category,
        Event
    .is_popular,
        Event
    .img,
      ]
    );
    return newEvent
;
  } catch (err) {
    return err;
  }
};

//delete
const deleteEvent = async (id) => {
  try {
    const deletedEvent
 = await db.one(
      "DELETE FROM Events WHERE id=$1 RETURNING *",
      id
    );
    return deletedEvent
;
  } catch (err) {
    return err;
  }
};

//update
const updateEvent = async (id, Event
) => {
  try {
    const updatedEvent
 = await db.one(
      "UPDATE Events SET name=$1, price=$2, category=$3, is_popular=$4, img=$5 WHERE id=$6 RETURNING *",
      [
        Event
    .name,
        Event
    .price,
        Event
    .category,
        Event
    .is_popular,
        Event
    .img,
        id,
      ]
    );
    return updatedEvent
;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
};
