const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

const AuthRoutes = require("./modules/user/user.route");
const SchoolRoutes = require("./modules/school/school.route");
const FormRoutes = require("./modules/formSubmission/form.route");
const NotificationRoutes = require("./modules/notification/notification.route"); // ✅ ADD THIS

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
  headers: true,
});

app.use(limiter);

// Routes
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api", AuthRoutes);
app.use("/api/schools", SchoolRoutes);
app.use("/api/form", FormRoutes);
app.use("/api/notifications", NotificationRoutes); // ✅ MOUNT HERE

// Static
app.use("/chat", express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.send("Hello, Express with MongoDB!");
});

module.exports = app;