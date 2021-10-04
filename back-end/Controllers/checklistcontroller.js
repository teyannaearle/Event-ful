const express = require("express");
const checklist = express.Router({ mergeParams: true });
// ----- STILL NEED TO DO REQ.BODY VALIDATION  ----
const {
  getChecklist,
  addToList,
  deleteFromList,
  updateTask,
  updateCost,
  deleteAll,
} = require("../queries/checklist");

const db = require("../db/dbConfig");

// INDEX

checklist.get("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;

  const checklist = await getChecklist(user_id, event_id);

  res.status(200).json({
    success: true,
    payload: checklist,
  });
});

// POST

checklist.post("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;

  try {
    const listItem = await addToList(req.body.task_name, user_id, event_id);

    if (listItem.user_id) {
      res.status(200).json({
        success: true,
        payload: listItem,
      });
    } else {
      throw listItem;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// DELETE ONE

checklist.delete("/:user_id/:event_id/:task_name", async (req, res) => {
  const { user_id, event_id, task_name } = req.params;

  try {
    const deleted = await deleteFromList(task_name, user_id, event_id);
    if (deleted.user_id) {
      res.status(200).json({
        success: true,
        payload: deleted,
      });
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

// DELETE ALL

checklist.delete("/all/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  try {
    const deleted = await deleteAll(user_id, event_id);
    if (deleted[0].user_id) {
      res.status(200).json({
        success: true,
        payload: deleted,
      });
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

// PUT

checklist.put("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  const { is_completed, task_name } = req.body;

  try {
    const updated = await updateTask(
      is_completed,
      task_name,
      user_id,
      event_id
    );

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

//UPDATE COST

checklist.put("/cost/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  const { task_cost, task_name } = req.body;

  try {
    const updated = await updateCost(task_cost, task_name, user_id, event_id);

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

module.exports = checklist;
