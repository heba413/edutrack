const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const AuthRoutes = require("./modules/user/user.route");
const SchoolRoutes = require("./modules/school/school.route");
const NotificationRoutes = require("./modules/notification/notification.route");
const communityChatRoutes = require('./modules/community-chat/community-chat.route');
const feedbackRoutes = require('./modules/feedback/feedback.route');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting Middleware (Example: max 100 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: "Too many requests, please try again later." },
  headers: true, // Send rate limit info in headers
});

// Apply rate limiting to all routes
app.use(limiter);

// Routes
app.use("/api", AuthRoutes);
app.use("/api/schools", SchoolRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use('/api/community-chat', communityChatRoutes);
app.use('/api/feedback', feedbackRoutes);


app.get("/", (req, res) => {
  res.send("Hello, Express with MongoDB!");
});

module.exports = app;
