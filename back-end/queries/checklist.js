const db = require("../db/dbConfig");

const getChecklist = async (user_id, event_id) => {
  try {
    const checklist = await db.any(
      "SELECT * FROM tasklist WHERE user_id=$1 AND event_id=$2 ORDER BY task_name ASC",
      [user_id, event_id]
    );
    return checklist;
  } catch (err) {
    return err;
  }
};

const addToList = async (task_name, user_id, event_id) => {
  try {
    const newListItem = await db.one(
      "INSERT INTO tasklist (task_name, user_id, event_id) VALUES($1, $2, $3) RETURNING *",
      [task_name, user_id, event_id]
    );
    return newListItem;
  } catch (err) {
    return err;
  }
};

const deleteFromList = async (task_name, user_id, event_id) => {
  try {
    const deletedTask = await db.one(
      "DELETE FROM tasklist WHERE task_name=$1 AND user_id=$2 AND event_id=$3 RETURNING *",
      [task_name, user_id, event_id]
    );
    return deletedTask;
  } catch (err) {
    return err;
  }
};

const deleteAll = async (user_id, event_id) => {
  try{
    const deleted = await db.any(
      "DELETE FROM tasklist WHERE user_id=$1 AND event_id=$2 RETURNING *",
      [user_id, event_id]
    )
    return deleted
  }catch (err){
    return errr
  }
}

const updateTask = async (is_completed, task_name, user_id, event_id) => {
  try {
    const updatedTask = await db.one(
      "UPDATE tasklist SET is_completed=$1 WHERE task_name=$2 AND user_id=$3 AND event_id=$4 RETURNING *",
      [is_completed, task_name, user_id, event_id]
    );
    return updatedTask;
  } catch (err) {
    return err;
  }
};

const updateCost = async (task_cost, task_name, user_id, event_id) => {
  try {
    const updatedTask = await db.one(
      "UPDATE tasklist SET task_cost=$1 WHERE task_name=$2 AND user_id=$3 AND event_id=$4 RETURNING *",
      [task_cost, task_name, user_id, event_id]
    );
    return updatedTask;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getChecklist,
  addToList,
  deleteFromList,
  updateTask,
  updateCost,
  deleteAll
};
