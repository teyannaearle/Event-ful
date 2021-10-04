const db = require("../db/dbConfig.js");
const pgp = require("pg-promise")();
let QRE = pgp.errors.QueryResultError;
let qrec = pgp.errors.queryResultErrorCode;

//index
const getAllBookedVendors = async (user_id, event_id) => {
  try {
    const allBookedVendors = await db.any(
      "SELECT * FROM booked WHERE user_id=$1 AND event_id=$2 ORDER BY vendor_name",
      [user_id, event_id]
    );
    return allBookedVendors;
  } catch (err) {
    if (err instanceof QRE && err.code === qrec.noData) {
      return null;
    } else {
      return err;
    }
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
    if (err instanceof QRE && err.code === qrec.noData) {
      return null;
    } else {
      return err;
    }
  }
};

const getOneCategory = async (user_id, event_id, category) => {
  try {
    const oneBookedVendor = await db.one(
      "SELECT * FROM booked WHERE user_id=$1 AND event_id=$2 AND category=$3",
      [user_id, event_id, category]
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
      "INSERT INTO booked (user_id, event_id, vendor_name, vendor_address, vendor_phone_number, category, rating, vendor_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        user_id,
        event_id,
        vendor.vendor_name,
        vendor.vendor_address,
        vendor.vendor_phone_number,
        vendor.category,
        vendor.rating,
        vendor.vendor_image,
      ]
    );
    return newBookedVendor;
  } catch (err) {
    return err;
  }
};

//delete
const deleteBookedVendor = async (user_id, event_id, category) => {
  try {
    const deletedBookedVendor = await db.one(
      "DELETE FROM booked WHERE user_id=$1 AND event_id=$2 AND category=$3 RETURNING *",
      [user_id, event_id, category]
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
      "UPDATE booked SET vendor_address=$1, vendor_phone_number=$2, vendor_name=$3, vendor_image=$4, rating=$5 WHERE user_id=$6 AND event_id=$7 AND category=$8 RETURNING *",
      [
        vendor.vendor_address,
        vendor.vendor_phone_number,
        vendor.vendor_name,
        vendor.vendor_image,
        vendor.rating,
        user_id,
        event_id,
        vendor.category,
      ]
    );
    return updatedBookedVendor;
  } catch (err) {
    return err;
  }
};

const updateCost = async (vendor, user_id, event_id) => {
  try {
    const updatedBookedVendor = await db.one(
      "UPDATE booked SET amount=$1 WHERE user_id=$2 AND event_id=$3 AND vendor_name=$4 RETURNING *",
      [vendor.amount, user_id, event_id, vendor.vendor_name]
    );
    return updatedBookedVendor;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllBookedVendors,
  getOneBookedVendor,
  getOneCategory,
  createBookedVendor,
  deleteBookedVendor,
  updateBookedVendor,
  updateCost,
};
