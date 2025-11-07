import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// ---- Auth APIs ----
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");

// ---- Doctor Appointments ----
export const fetchDoctorAppointments = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const doctorId = user?._id; 


  if (!doctorId) {
    console.error(" Doctor ID not found in localStorage");
    return [];
  }

  try {
    const response = await API.get(`/appointments/doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error(" Error fetching doctor appointments:", error);
    return [];
  }
};

// ---- Appointments ----
export const getAllDoctors = () => API.get("/appointments/doctors");
export const bookAppointment = (data) => API.post("/appointments/book", data);
export const getDoctorAppointments = (id) => API.get(`/appointments/doctor/${id}`);

