const express = require("express");
const favorites = express.Router({ mergeParams: true });

// validation, error handling

const {
  getAllFavorites,
  getOneFavorite,
  createFavorite,
  deleteFavorite,
  updateFavorite,
} = require("../queries/favorites");

const db = require("../db/dbConfig");

// INDEX
favorites.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const allFavoriteVendors = await getAllFavorites(user_id);
  console.log(allFavoriteVendors)
 
    res.status(200).json({
      success: true,
      message: allFavoriteVendors,
    });
});

// SHOW
favorites.get("/:user_id/:event_id/:vendor_name", async (req, res) => {
  const { user_id, vendor_name } = req.params;
  try {
    const favoriteVendor = await getOneFavorite(user_id, vendor_name);
    console.log(favoriteVendor)
    if (favoriteVendor) {
      res.status(200).json({
        success: true,
        payload: favoriteVendor,
      });
    } else {
      // throw `No favorite vendor found with name ${vendor_name}`;
      res.status(404).json({
        success: false, 
        payload: `No favorite vendor found with name ${vendor_name}`
      })
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// CREATE
favorites.post("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const newFavoriteVendor = await createFavorite(req.body, user_id);
    if (newFavoriteVendor.user_id) {
      res.status(200).json({
        success: true,
        payload: newFavoriteVendor,
      });
    } else {
      throw `No vendor was favorited with name ${req.body.vendor_name}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// DELETE
favorites.delete("/:user_id/:vendor_name", async (req, res) => {
  const { user_id, vendor_name } = req.params;
  console.log(`line 83 ${user_id}, ${vendor_name}`);
  try {
    const deletedFavoriteVendor = await deleteFavorite(user_id, vendor_name);
    if (deletedFavoriteVendor.vendor_name) {
      res.status(200).json({ success: true, payload: deletedFavoriteVendor });
    } else {
      throw `No favorite vendor was deleted with ${req.body.vendor_name}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// UPDATE
favorites.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const updatedFavoriteVendor = await updateFavorite(req.body, user_id);
    if (updatedFavoriteVendor.user_id) {
      res.status(200).json({
        success: true,
        payload: updatedFavoriteVendor,
      });
    } else {
      throw `No vendor was updated with ${req.body.name}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

module.exports = favorites;
