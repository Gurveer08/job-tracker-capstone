import { useState } from "react";

export default function JobSkills() {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const handleAddSkill = () => {
    if (skill.trim() === "") return;

    setSkills([...skills, skill.trim()]);
    setSkill("");
  };

  const handleDelete = (indexToDelete) => {
    setSkills(skills.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={styles.container}>
      <h1>Job Skills</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter a skill (e.g. React, SQL)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleAddSkill} style={styles.button}>
          Add Skill
        </button>
      </div>

      <ul style={styles.list}>
        {skills.map((s, index) => (
          <li key={index} style={styles.listItem}>
            {s}
            <button
              onClick={() => handleDelete(index)}
              style={styles.deleteBtn}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    color: "#333",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    width: "250px",
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    width: "300px",
    padding: "8px",
    marginBottom: "8px",
    backgroundColor: "#f2f2f2",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};