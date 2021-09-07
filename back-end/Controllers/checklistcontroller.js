const express = require("express");
const checklist = express.Router({ mergeParams: true });

const {
    getChecklist
} = require ("../queries/checklist")

const db = require("../db/dbConfig")

checklist.get("/:user_id/:event_id", async (req, res) => {
    const {user_id , event_id} = req.params
    const checklist = await getChecklist(user_id, event_id)
    res.status(200).json({
        success: true,
        payload: checklist
    })
})


module.exports = checklist