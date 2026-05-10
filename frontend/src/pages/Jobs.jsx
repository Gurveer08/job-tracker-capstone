import { useState } from "react";

export default function Jobs() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobs, setJobs] = useState([]);

  const handleAddJob = () => {
    if (company.trim() === "" || role.trim() === "") return;

    const newJob = {
      company: company.trim(),
      role: role.trim(),
      status,
    };

    setJobs([...jobs, newJob]);

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  const handleDelete = (indexToDelete) => {
    setJobs(jobs.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={styles.container}>
      <h1>Job Applications</h1>

      {/* Form */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Role (e.g. Frontend Developer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button onClick={handleAddJob} style={styles.button}>
          Add Job
        </button>
      </div>

      {/* Job List */}
      <div>
        {jobs.map((job, index) => (
          <div key={index} style={styles.card}>
            <div>
              <h3 style={{ margin: 0 }}>{job.company}</h3>
              <p style={{ margin: "5px 0" }}>{job.role}</p>
              <span style={styles.status}>{job.status}</span>
            </div>

            <button
              onClick={() => handleDelete(index)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
    width: "300px",
  },
  input: {
    padding: "8px",
  },
  button: {
    padding: "8px",
    cursor: "pointer",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginBottom: "10px",
    backgroundColor: "#f2f2f2",
    width: "400px",
  },
  status: {
    display: "inline-block",
    marginTop: "5px",
    padding: "3px 8px",
    backgroundColor: "#333",
    color: "white",
    fontSize: "12px",
    borderRadius: "4px",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
};