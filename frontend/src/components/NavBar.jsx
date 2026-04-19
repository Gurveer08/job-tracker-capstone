function Navbar() {
    return (
      <div style={styles.nav}>
        <span>Jobs</span>
        <span>Skills</span>
        <span>Contacts</span>
        <span>Settings</span>
      </div>
    );
  }
  
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-around",
      padding: "10px",
      backgroundColor: "#333",
      color: "white",
      marginTop: "20px",
    },
  };
  
  export default Navbar;