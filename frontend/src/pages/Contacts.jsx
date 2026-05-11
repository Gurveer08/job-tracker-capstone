import { useState } from "react";

export default function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [contacts, setContacts] = useState([]);

  const handleAddContact = () => {
    if (name.trim() === "" || email.trim() === "") return;

    const newContact = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
    };

    setContacts([...contacts, newContact]);

    setName("");
    setEmail("");
    setCompany("");
  };

  const handleDelete = (indexToDelete) => {
    setContacts(contacts.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={styles.container}>
      <h1>Contacts</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleAddContact} style={styles.button}>
          Add Contact
        </button>
      </div>

      <div>
        {contacts.map((c, index) => (
          <div key={index} style={styles.card}>
            <div>
              <h3 style={{ margin: 0 }}>{c.name}</h3>
              <p style={{ margin: "5px 0" }}>{c.email}</p>
              {c.company && <p style={{ margin: 0 }}>{c.company}</p>}
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
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f2f2f2",
    width: "400px",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
};