{/* Add React Hook */}
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";

function Dashboard() {
  const userName = "User Name";

  const [stats, setStats] = useState({
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    rejections: 0,
    contacts: 0,
    skillsTracked: 0,
  });

  {/* Add loading and error states */}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const applications = [
    { company: "Google Internship", status: "Interviewing" },
    { company: "Amazon SWE Intern", status: "Applied" },
    { company: "Meta Internship", status: "Rejected" },
  ];

  {/* Add the backend API call */}
  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await fetch("http://localhost:3000/api/dashboard/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard stats error:", err);
        setError("Could not load dashboard stats.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.title}>Job Tracker Dashboard</h1>
      <h3 style={styles.welcome}>Welcome, {userName}</h3>

      {/* Applications Summary */}
      <div style={styles.card}>
        <h2>Applications Summary</h2>

        {loading ? (
          <p style={styles.summaryText}>Loading dashboard stats...</p>
        ) : error ? (
          <p style={styles.errorText}>{error}</p>
        ) : (
          <p style={styles.summaryText}>
            Applied: <b>{stats.totalApplications}</b> | Interviewing:{" "}
            <b>{stats.interviews}</b> | Offers: <b>{stats.offers}</b>
          </p>
        )}
      </div>

      {/* Recent Applications */}
      <div style={styles.card}>
        <h2>Recent Applications</h2>

        <ul style={styles.list}>
          {applications.map((app, index) => (
            <li key={index} style={styles.listItem}>
              <span>{app.company}</span>
              <span style={styles.status}>{app.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div style={styles.card}>
        <h2>Quick Actions</h2>

        <div style={styles.buttonRow}>
          <button style={styles.button}>+ Add Job</button>
          <button style={styles.button}>+ Add Skill</button>
          <button style={styles.button}>+ Add Contact</button>
        </div>
      </div>

      {/* Navigation */}
      <Navbar />
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    marginBottom: "5px",
  },
  welcome: {
    marginTop: "0",
    marginBottom: "20px",
    color: "#555",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
  },
  summaryText: {
    fontSize: "16px",
  },
  errorText: {
    fontSize: "16px",
    color: "crimson",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  status: {
    fontWeight: "bold",
    color: "#333",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "white",
  },
};

export default Dashboard;