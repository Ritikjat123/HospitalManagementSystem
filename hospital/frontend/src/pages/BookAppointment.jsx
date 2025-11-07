import { useEffect, useState } from "react";
import { getAllDoctors, bookAppointment } from "../services/api";

export default function BookAppointment() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors();
        setDoctors(res.data.doctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.doctorId || !form.date || !form.time) {
      alert(" Please fill all fields before booking.");
      return;
    }

    const patientId = user?._id || user?.user?._id;

    const payload = {
      patientId,
      doctorId: form.doctorId,
      date: form.date,
      time: form.time,
    };

    console.log(" Sending appointment data:", payload);
    

    try {
      const res = await bookAppointment(payload);
      alert(" Appointment booked successfully!");
      console.log("Response:", res.data);

      // Reset form after successful booking
      setForm({ doctorId: "", date: "", time: "" });
    } catch (err) {
      console.error(" Booking error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="book-appointment">
      <h2>🩺 Book Appointment</h2>

      <form onSubmit={handleSubmit}>
        <select name="doctorId" value={form.doctorId} onChange={handleChange}>
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} ({d.email})
            </option>
          ))}
        </select>

        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input type="time" name="time" value={form.time} onChange={handleChange} />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}
