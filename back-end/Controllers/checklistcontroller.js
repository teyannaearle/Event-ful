const express = require("express");
const checklist = express.Router({ mergeParams: true });

const {
    getChecklist
} = require ("../queries/checklist")

const db = require("../db/dbConfig")

checklist.get("/:user_id/:event_id", async (req, res) => {
    const checklist = await getChecklist()
    res.status(200).json({
        success: true,
        payload: checklist
    })
})


module.exports = checklist