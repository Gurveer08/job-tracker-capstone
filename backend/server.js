const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


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

// Dashboard stats endpoint. Queries the database directly 
// for counts used by the frontend dashboard.
app.get("/api/dashboard/stats", async (req, res) => {
  try {

    // COUNT(*) counts every row in the specificed table (Jobs, Contacts, Skills)
    // [[DoubleDestructring]] used to simplify the result from mysql2, which returns an array of rows. 
    // We only need the first row, which contains the count.
    const [[totalApplications]] = await db.query(
      "SELECT COUNT(*) AS count FROM Jobs"
    );

    const [[interviews]] = await db.query(
      "SELECT COUNT(*) AS count FROM Jobs WHERE job_status = 'Interviewing'"
    );

    const [[offers]] = await db.query(
      "SELECT COUNT(*) AS count FROM Jobs WHERE job_status = 'Offer'"
    );

    const [[rejections]] = await db.query(
      "SELECT COUNT(*) AS count FROM Jobs WHERE job_status = 'Rejected'"
    );

    const [[contacts]] = await db.query(
      "SELECT COUNT(*) AS count FROM Contacts"
    );

    const [[skillsTracked]] = await db.query(
      "SELECT COUNT(*) AS count FROM Skills"
    );

    res.json({
      totalApplications: totalApplications.count,
      interviews: interviews.count,
      offers: offers.count,
      rejections: rejections.count,
      contacts: contacts.count,
      skillsTracked: skillsTracked.count,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err.message);
    res.status(500).json({ error: "Failed to load dashboard stats" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});