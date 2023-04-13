const express = require("express");
const booked = express.Router({ mergeParams: true });

// validation, error handling

const {
  getAllBookedVendors,
  getOneBookedVendor,
  createBookedVendor,
  deleteBookedVendor,
  updateBookedVendor,
  getOneCategory,
  updateCost,
} = require("../queries/booked");

const db = require("../db/dbConfig");

// INDEX
booked.get("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  const allBookedVendors = await getAllBookedVendors(user_id, event_id)
  console.log(allBookedVendors)
  res.status(200).json({
    success: true,
    payload: allBookedVendors
  })
});

// SHOW
booked.get("/:user_id/:event_id/:vendor_name", async (req, res) => {
  const { user_id, event_id, vendor_name } = req.params;
  try {
    const bookedVendor = await getOneBookedVendor(
      user_id,
      event_id,
      vendor_name
    );
    console.log(bookedVendor)
    if (bookedVendor) {
      res.status(200).json({
        success: true,
        payload: bookedVendor,
      });
    } else {
      // throw `No booked vendor found with name ${vendor_name}`;
      res.status(200).json({
        success: false,
        payload: `No booked vendor ${vendor_name} found`,
      });
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

booked.get("/category/:category/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id, category } = req.params;
  try {
    const bookedVendor = await getOneCategory(user_id, event_id, category);
    if (bookedVendor) {
      res.status(200).json({
        success: true,
        payload: bookedVendor,
      });
    } else {
      // throw `No booked vendor found with name ${vendor_name}`;
      res.status(404).json({
        success: false,
        payload: `No booked vendor ${vendor_name} found`,
      });
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// CREATE
booked.post("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  try {
    const newBookedVendor = await createBookedVendor(
      req.body,
      user_id,
      event_id
    );
    console.log(newBookedVendor);
    if (newBookedVendor) {
      res.status(200).json({
        success: true,
        payload: newBookedVendor,
      });
    } else {
      throw `No vendor was booked with name ${req.body.vendor_name}`;
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// DELETE
booked.delete("/:user_id/:event_id/:category", async (req, res) => {
  const { user_id, event_id, category } = req.params;
  try {
    const deletedBookedVendor = await deleteBookedVendor(
      user_id,
      event_id,
      category
    );
    if (deletedBookedVendor.user_id) {
      res.status(200).json({ success: true, payload: deletedBookedVendor });
    } else {
      throw `No booked vendor was deleted with category name ${category}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// UPDATE
booked.put("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  const vendor = req.body;
  console.log(req.body);
  try {
    const updatedBookedVendor = await updateBookedVendor(
      vendor,
      user_id,
      event_id
    );
    if (updatedBookedVendor.user_id) {
      res.status(200).json({
        success: true,
        payload: updatedBookedVendor,
      });
    } else {
      console.log(updatedBookedVendor);
      throw `No vendor was updated with ${vendor.vendor_name}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

booked.put("/cost/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  const vendor = req.body;

  try {
    const updatedBookedVendor = await updateCost(vendor, user_id, event_id);
    if (updatedBookedVendor.user_id) {
      res.status(200).json({
        success: true,
        payload: updatedBookedVendor,
      });
    } else {
      console.log(updatedBookedVendor);
      throw `No vendor was updated with ${vendor.vendor_name}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

module.exports = booked;
