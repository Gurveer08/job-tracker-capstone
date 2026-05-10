import { useState, useMemo } from "react";
import Navbar from "../components/NavBar";

function Dashboard() {
  const userName = "User Name";

  const [applications, setApplications] = useState([
    { id: 1, company: "Google Internship", status: "Interviewing" },
    { id: 2, company: "Amazon SWE Intern", status: "Applied" },
    { id: 3, company: "Meta Internship", status: "Rejected" },
  ]);

  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [filter, setFilter] = useState("All");

  // Add new application
  const handleAddJob = () => {
    if (company.trim() === "") return;

    const newJob = {
      id: Date.now(),
      company,
      status,
    };

    setApplications([...applications, newJob]);
    setCompany("");
    setStatus("Applied");
  };

  // Delete application
  const handleDelete = (id) => {
    setApplications(applications.filter((job) => job.id !== id));
  };

  // Filtered applications
  const filteredApplications = useMemo(() => {
    if (filter === "All") return applications;
    return applications.filter((job) => job.status === filter);
  }, [applications, filter]);

  // Dynamic summary counts
  const summary = useMemo(() => {
    return {
      applied: applications.filter((job) => job.status === "Applied").length,
      interviewing: applications.filter(
        (job) => job.status === "Interviewing"
      ).length,
      rejected: applications.filter((job) => job.status === "Rejected").length,
      offers: applications.filter((job) => job.status === "Offer").length,
    };
  }, [applications]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Job Tracker Dashboard</h1>
      <h3 style={styles.welcome}>Welcome, {userName}</h3>

      {/* Summary */}
      <div style={styles.card}>
        <h2>Applications Summary</h2>
        <p style={styles.summaryText}>
          Applied: <b>{summary.applied}</b> | Interviewing:{" "}
          <b>{summary.interviewing}</b> | Rejected: <b>{summary.rejected}</b> |
          Offers: <b>{summary.offers}</b>
        </p>
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