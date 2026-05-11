{/* Add React Hook */}
import { useEffect, useMemo, useState } from "react";
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

  const [applications, setApplications] = useState([
    { id: 1, company: "Google Internship", status: "Interviewing" },
    { id: 2, company: "Amazon SWE Intern", status: "Applied" },
    { id: 3, company: "Meta Internship", status: "Rejected" },
  ]);

  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [filter, setFilter] = useState("All");

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

  const handleDelete = (id) => {
    setApplications(applications.filter((job) => job.id !== id));
  };

  const filteredApplications = useMemo(() => {
    if (filter === "All") return applications;
    return applications.filter((job) => job.status === filter);
  }, [applications, filter]);

  const summary = useMemo(() => {
    return {
      applied: applications.filter((job) => job.status === "Applied").length,
      interviewing: applications.filter((job) => job.status === "Interviewing").length,
      rejected: applications.filter((job) => job.status === "Rejected").length,
      offers: applications.filter((job) => job.status === "Offer").length,
    };
  }, [applications]);

  const getStatusStyle = (status) => {
    const base = {
      padding: "4px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
    };

    switch (status) {
      case "Applied":
        return { ...base, background: "#dbeafe", color: "#1d4ed8" };
      case "Interviewing":
        return { ...base, background: "#fef9c3", color: "#854d0e" };
      case "Rejected":
        return { ...base, background: "#fee2e2", color: "#991b1b" };
      case "Offer":
        return { ...base, background: "#dcfce7", color: "#166534" };
      default:
        return base;
    }
  };

  const dashboardStats = error
    ? {
        totalApplications: applications.length,
        interviews: summary.interviewing,
        offers: summary.offers,
        rejections: summary.rejected,
        contacts: 0,
        skillsTracked: 0,
      }
    : stats;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>Job Tracker</h1>
          <p style={styles.subtext}>Welcome back, {userName}</p>
        </div>

        {/* SUMMARY CARDS */}
        <div style={styles.summaryGrid}>
          <div style={styles.summaryCard}>Applied<br /><b>{summary.applied}</b></div>
          <div style={styles.summaryCard}>Interviewing<br /><b>{summary.interviewing}</b></div>
          <div style={styles.summaryCard}>Rejected<br /><b>{summary.rejected}</b></div>
          <div style={styles.summaryCard}>Offers<br /><b>{summary.offers}</b></div>
        </div>

        {/* ADD JOB */}
        <div style={styles.card}>
          <h2>Add Application</h2>

          <div style={styles.row}>
            <input
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

            <button style={styles.addButton} onClick={handleAddJob}>
              Add +
            </button>
          </div>
        </div>

        {/* FILTER */}
        <div style={styles.card}>
          <h2>Filter</h2>
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

        {/* LIST */}
        <div style={styles.card}>
          <h2>Applications</h2>

          <div>
            {filteredApplications.map((job) => (
              <div key={job.id} style={styles.jobRow}>
                <div>
                  <div style={styles.company}>{job.company}</div>
                  <div style={getStatusStyle(job.status)}>{job.status}</div>
                </div>

                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(job.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   🎨 REAL VISUAL REDESIGN
========================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "30px",
    color: "white",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "20px",
  },

  title: {
    fontSize: "34px",
    margin: 0,
  },

  subtext: {
    color: "#cbd5e1",
    marginTop: "5px",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },

  summaryCard: {
    background: "#111827",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
  },

  card: {
    background: "#0b1220",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },

  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    flex: 1,
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
  },

  addButton: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  jobRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid #1f2937",
  },

  company: {
    fontWeight: "600",
    marginBottom: "5px",
  },

  deleteButton: {
    background: "transparent",
    border: "none",
    color: "#ef4444",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default Dashboard;
