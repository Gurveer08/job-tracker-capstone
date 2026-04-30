const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Quick sanity check to ensure Job Tracker backend is alive and running
app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    console.error("Database health check failed:", err.message);
    res.status(500).json({ status: "error", database: "not connected" });
  }
});

app.get("/api/dashboard/stats", async (req, res) => {
  try {
    // Temporary starter values
    res.json({
      totalApplications: 0,
      interviews: 0,
      offers: 0,
      rejections: 0,
      contacts: 0,
      skillsTracked: 0,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err.message);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});