const db = require("../db/dbConfig")

const getChecklist = async (user_id, event_id) => {
    try {
        const checklist = await db.any("SELECT * FROM tasklist WHERE user_id=$1 AND event_id=$1", [user_id, event_id]);
        return checklist
    } catch (err) {
        return err
    }
}

module.exports = {
    getChecklist
}