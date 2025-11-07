const express = require("express");
const connectDB = require("./config/DBconnect");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",  // CRA default port
    credentials: true,
  })
);



connectDB();

// Routes
const authRoutes = require("./routes/Auth.js");
app.use("/api/auth", authRoutes);

const appointmentRoutes = require("./routes/Appointment");
app.use("/api/appointments", appointmentRoutes);


app.get("/", (req, res) => {
  res.send("Hospital Appointment Backend Running ");
});

app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});
