import { useEffect, useState } from "react";
import { getDoctorAppointments, getAllDoctors } from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { role: "guest", name: "Guest" };
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === "doctor") {
          const res = await getDoctorAppointments(user._id);
          // Ensure appointments is always an array
          setAppointments(res.data?.appointments || res.data || []);
        } else if (user.role === "patient") {
          const res = await getAllDoctors();
          setDoctors(res.data?.doctors || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setAppointments([]);
        setDoctors([]);
      }
    };
    fetchData();
  }, [user]);

  // ---------- Doctor View ----------
  const renderDoctorView = () => (
    <>
      <h2>Welcome, Dr. {user.name}!</h2>
      <p>Role: {user.role}</p>
      <h3>Your Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul className="appointments-list">
          {appointments.map((a) => (
            <li key={a._id} className="appointment-card">
              <p><strong>Patient:</strong> {a.patient?.name || a.patient}</p>
              <p><strong>Date:</strong> {a.date}</p>
              <p><strong>Time:</strong> {a.time}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );

  // ---------- Patient View ----------
  const renderPatientView = () => (
    <div className="patient-dashboard">
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>
      <h3>Available Doctors</h3>
      {doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <ul className="doctors-list">
          {doctors.map((d) => (
            <li key={d._id} className="doctor-card">
              {d.name} ({d.email})
            </li>
          ))}
        </ul>
      )}
      <Link to="/book" className="book-link">Book Appointment</Link>
    </div>
  );

  return <div className="dashboard">{user.role === "doctor" ? renderDoctorView() : renderPatientView()}</div>;
};

export default Dashboard;
