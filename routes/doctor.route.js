const express = require("express");
require("dotenv").config();
const { Appointment } = require("../model/doctor.model");
const docterRoute = express.Router();

docterRoute.post("/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res
      .status(200)
      .json({ msg: "appointment created", appointment: appointment });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

docterRoute.get("/", async (req, res) => {
  try {
    const { specialization, sortby, search } = req.query;
    let query = Appointment.find().populate("user");

    if (specialization) {
      query = query.where({ specialization });
    }
    if (sortby) {
      const sortfield = sortby === "descending" ? "-date" : "date";
      query = query.sort(sortfield);
    }
    if (search) {
      query = query.where({ name: { $regex: search, $options: "i" } });
    }

    const data = await query;
    if (data.length == 0) {
      return res.status(201).json({ msg: "no appointment" });
    }
    res.status(200).json({ msg: "data", data: data });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

docterRoute.patch("/:id", async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const data = await Appointment.findByIdAndUpdate(id, payload);
    if (!data) {
      return res.status(201).json({ msg: "not found" });
    }
    res.status(200).json({ msg: "appintment eddited", data: data });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

docterRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Appointment.findByIdAndDelete(id);
    if (!data) {
      return res.status(201).json({ msg: "not found" });
    }
    res.status(200).json({ msg: "appintment deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { docterRoute };
