const db = require("../db/dbConfig.js");

//index
const getAllFavorites = async (user_id) => {
  try {
    const allFavorites = await db.any(
      "SELECT * FROM favorites WHERE user_id=$1 ORDER BY vendor_name"
    );
    return allFavorites;
  } catch (err) {
    return err;
  }
};

//Show
const getOneFavorite = async (user_id, vendor_name) => {
  try {
    const oneFavorite = await db.one(
      "SELECT * FROM favorite WHERE user_id=$1 AND vendor_name=$2",
      [user_id, vendor_name]
    );
    return oneFavorite;
  } catch (err) {
    return err;
  }
};

//create
const createFavorite = async (vendor, user_id) => {
  try {
    const newFavorite = await db.one(
      "INSERT INTO favorites (user_id, vendor_name, vendor_address, vendor_phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        user_id,
        vendor.name,
        vendor.address,
        vendor.phoneNumber,
      ]
    );
    return newFavorite;
  } catch (err) {
    return err;
  }
};

//delete
const deleteFavorite = async (user_id, vendorName) => {
  try {
    const deletedFavorite = await db.one(
      "DELETE FROM favorites WHERE user_id=$1 AND vendor_name=$2 RETURNING *",
      [user_id, vendorName]
    );
    return deletedFavorite;
  } catch (err) {
    return err;
  }
};

//update
const updateFavorite = async (vendor, user_id) => {
  try {
    const updatedFavorite = await db.one(
      "UPDATE favorites SET vendor_name=$1, vendor_address=$2, vendor_phone_number=$3 WHERE user_id=$4 RETURNING *",
      [
        vendor.name,
        vendor.address,
        vendor.phoneNumber,
        user_id,
      ]
    );
    return updatedFavorite;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllFavorites,
  getOneFavorite,
  createFavorite,
  deleteFavorite,
  updateFavorite,
};
