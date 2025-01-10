import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Load email and password from localStorage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const onSubmitValue = (name, value) => {
    if (name === "email") {
      setEmail(value);
      localStorage.setItem("email", value); // Save to localStorage
    }
    if (name === "password") {
      setPassword(value);
      localStorage.setItem("password", value); // Save to localStorage
    }
  };

  const handleSubmit = async () => {
    console.log("Handle submit is clicked: " + password + " " + email);

    // Backend API call
    let obj = { email, password };
    let data = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    let response = await data.json();

    // Save token to localStorage
    localStorage.setItem("token", JSON.stringify(response.token));
    console.log(response);

    navigate("/ProductList");
  };

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.header}>Login</h1>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(event) => {
                onSubmitValue(event.target.name, event.target.value);
              }}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => {
                onSubmitValue(event.target.name, event.target.value);
              }}
              style={styles.input}
            />
          </div>

          <button
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            style={styles.button}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Auth;
