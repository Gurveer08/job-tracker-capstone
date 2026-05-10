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
      <h1 style={styles.title}>Job Tracker Dashboard</h1>
      <h3 style={styles.welcome}>Welcome, {userName}</h3>

      {/* Summary */}
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

      {/* Add Job Form */}
      <div style={styles.card}>
        <h2>Add Application</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={styles.input}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.select}
        >
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <button style={styles.button} onClick={handleAddJob}>
          + Add Job
        </button>
      </div>

      {/* Filter */}
      <div style={styles.card}>
        <h2>Filter Applications</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.select}
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>
      </div>

      {/* Applications List */}
      <div style={styles.card}>
        <h2>Applications</h2>

        <ul style={styles.list}>
          {filteredApplications.map((job) => (
            <li key={job.id} style={styles.listItem}>
              <div>
                <strong>{job.company}</strong> - {job.status}
              </div>

              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

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
    marginTop: 0,
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
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  input: {
    padding: "10px",
    marginRight: "10px",
    marginBottom: "10px",
    width: "220px",
  },
  select: {
    padding: "10px",
    marginRight: "10px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#333",
    color: "white",
  },
  deleteButton: {
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "crimson",
    color: "white",
  },
};

export default Dashboard;