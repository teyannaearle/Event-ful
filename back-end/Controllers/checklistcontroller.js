const express = require("express");
const checklist = express.Router({ mergeParams: true });
// ----- STILL NEED TO DO REQ.BODY VALIDATION  ----
const {
  getChecklist,
  addToList,
  deleteFromList,
  updateTask,
  updateCost,
} = require("../queries/checklist");

const db = require("../db/dbConfig");

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

checklist.post("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  const listItem = await addToList(req.body.task_name, user_id, event_id);
res.json(listItem)
  // try {
  //   const listItem = await addToList(req.body.task_name, user_id, event_id);

  //   if (listItem[0].user_id) {
  //     res.status(200).json({
  //       success: true,
  //       payload: listItem,
  //     });
  //   } else {
  //     throw listItem;
  //   }
  // } catch (e) {
  //   res.status(404).json({
  //     success: false,
  //     message: e,
  //   });
  // }
});

checklist.delete("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;

  try {
    const deleted = await deleteFromList(req.body.task_name, user_id, event_id);
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
