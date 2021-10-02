const express = require("express");
const checklist = express.Router({ mergeParams: true });
// ----- STILL NEED TO DO REQ.BODY VALIDATION  ----
const {
  getChecklist,
  addToList,
  deleteFromList,
  updateTask,
  updateCost,
  deleteAll
} = require("../queries/checklist");

const db = require("../db/dbConfig");

//GET ENTIRE CHECKLIST RELATED TO AN EVENT 

checklist.get("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;

  try {
    const checklist = await getChecklist(user_id, event_id);

    if (checklist[0].user_id) {
      res.status(200).json({
        success: true,
        payload: checklist,
      });
    } else {
      throw checklist;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

//POST A SINGLE CATEGORY TO THE CHECKLIST 

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


// DELETE A SINGLE CATEGORY FROM THE CHECKLIST

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

// DELETE ENTIRE CHECKLIST RELATED TO AN EVENT

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

//UPDATE IF A CATEGORY IS COMPLETED

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

//UPDATE A CATEGORY'S COST

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
