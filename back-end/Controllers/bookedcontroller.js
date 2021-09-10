const express = require("express");
const booked = express.Router({ mergeParams: true });

// validation, error handling

const {
  getAllBookedVendors,
  getOneBookedVendor,
  createBookedVendor,
  deleteBookedVendor,
  updateBookedVendor,
} = require("../queries/booked");

const db = require("../db/dbConfig");

// INDEX
booked.get("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  try {
    const allBookedVendors = await getAllBookedVendors(user_id, event_id);
    if (allBookedVendors[0].user_id) {
      res.status(200).json({
        success: true,
        message: allBookedVendors,
      });
    } else {
      throw `No booked vendors found for user ID ${user_id}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
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
    if (bookedVendor.user_id) {
      res.status(200).json({
        success: true,
        payload: bookedVendor,
      });
    } else {
      throw `No booked vendor found with name ${vendor_name}`;
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

    if (newBookedVendor.user_id) {
      res.status(200).json({
        success: true,
        payload: newBookedVendor,
      });
    } else {
      throw `No vendor was booked with name ${req.body.name}`;
    }
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e,
    });
  }
});

// DELETE
booked.delete("/:user_id/:event_id", async (req, res) => {
  const { user_id, event_id } = req.params;
  const vendorName = req.body.vendor_name;
  try {
    const deletedBookedVendor = await deleteBookedVendor(
      user_id,
      event_id,
      vendorName
    );
    if (deletedBookedVendor.user_id) {
      res.status(200).json({ success: true, payload: deletedBookedVendor });
    } else {
      throw `No booked vendor was deleted with ${vendorName}`;
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
  const vendor  = req.body;
  console.log(req.body)
  try {
    const updatedBookedVendor = await updateBookedVendor(vendor, user_id, event_id);
    if (updatedBookedVendor.user_id) {
      res.status(200).json({
        success: true,
        payload: updatedBookedVendor,
      });
    } else {
      console.log(updatedBookedVendor)
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
