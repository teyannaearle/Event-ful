const db = require("../db/dbConfig")

const getChecklist = async (userid, eventid) => {
    try {
        const checklist = await db.any("SELECT * FROM tasklist WHERE userid=$1 AND eventid=$1", [userid, eventid])
        return checklist
    } catch (err) {
        return err
    }
}

module.exports = {
    getChecklist
}