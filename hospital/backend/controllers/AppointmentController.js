const Appointment = require("../models/Appointment");
const User = require("../models/User");

//  Book an appointment (patient)
exports.bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    console.log(" Incoming appointment data:", req.body);

    if (!patientId || !doctorId || !date || !time) {
      console.log(" Missing fields:", { patientId, doctorId, date, time });
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor")
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
    });

    res
      .status(201)
      .json({ success: true, message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error("Book Appointment Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};



//  Get all appointments for doctor 
exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required" });
    }

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name email");

    //  Wrap in object
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Get Doctor Appointments Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//  Get all doctors (for patient to view)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("name email");
    res.status(200).json({ success: true, doctors });
  } catch (err) {
    console.error("Get Doctors Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
