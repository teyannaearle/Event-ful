const db = require("../db/dbConfig.js");

//index
const getAllBookedVendors = async (user_id, event_id) => {
  try {
    const allBookedVendors = await db.any(
      "SELECT * FROM booked WHERE user_id=$1 AND event_id=$2 ORDER BY vendor_name", [user_id, event_id]
    );
    return allBookedVendors;
  } catch (err) {
    return err;
  }
};

//Show
const getOneBookedVendor = async (user_id, event_id, vendor_name) => {
  try {
    const oneBookedVendor = await db.one(
      "SELECT * FROM booked WHERE user_id=$1 AND event_id=$2 AND vendor_name=$3",
      [user_id, event_id, vendor_name]
    );
    return oneBookedVendor;
  } catch (err) {
    return err;
  }
};

//create
const createBookedVendor = async (vendor, user_id, event_id) => {
  try {
    const newBookedVendor = await db.one(
      "INSERT INTO booked (user_id, event_id, vendor_name, vendor_address, vendor_phone_number, amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        user_id,
        event_id,
        vendor.vendor_name,
        vendor.vendor_address,
        vendor.vendor_phone_number,
        vendor.amount,
      ]
    );
    return newBookedVendor;
  } catch (err) {
    return err;
  }
};

//delete
const deleteBookedVendor = async (user_id, event_id, vendor_name) => {
  try {
    const deletedBookedVendor = await db.one(
      "DELETE FROM booked WHERE user_id=$1 AND event_id=$2 AND vendor_name=$3 RETURNING *",
      [user_id, event_id, vendor_name]
    );
    return deletedBookedVendor;
  } catch (err) {
    return err;
  }
};

//update
const updateBookedVendor = async (vendor, user_id, event_id) => {
  try {
    const updatedBookedVendor = await db.one(
      "UPDATE booked SET vendor_address=$1, vendor_phone_number=$2, amount=$3 WHERE user_id=$4 AND event_id=$5 AND vendor_name=$6 RETURNING *",
      [
        vendor.vendor_address,
        vendor.vendor_phone_number,
        vendor.amount,
        user_id,
        event_id,
        vendor.vendor_name
      ]
    );
    return updatedBookedVendor;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllBookedVendors,
  getOneBookedVendor,
  createBookedVendor,
  deleteBookedVendor,
  updateBookedVendor,
};
