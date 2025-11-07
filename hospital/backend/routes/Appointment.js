const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getDoctorAppointments,
  getAllDoctors,
} = require("../controllers/AppointmentController");


router.post("/book", bookAppointment);
router.get("/doctor/:doctorId", getDoctorAppointments);
router.get("/doctors", getAllDoctors);


module.exports = router;
