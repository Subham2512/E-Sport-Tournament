import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gameImage from "../Images/gameImage.png";

function ChangeEmailForm() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: "",
    confirmEmail: "",
    username: username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!(formData.newEmail === formData.confirmEmail)) {
      setError("New Email and Confirm Email do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/update-email",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setFormData({
          currentEmail: "",
          newEmail: "",
          confirmEmail: "",
          username: username,
        });
        setError("");
        // Dispatch an action or handle success logic here
      } else {
        const err = new Error(res.error);
        throw err;
      }
    } catch (error) {
      setError("Error updating email");
      console.log(error);
      // Handle error logic here
    }
  };

  return (
    <div style={styles.changeForm}>
      <h2 style={styles.heading}>Change Email</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type='email'
          placeholder='Current Email'
          name='currentEmail'
          value={formData.currentEmail}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type='email'
          placeholder='New Email'
          name='newEmail'
          value={formData.newEmail}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type='email'
          placeholder='Confirm New Email'
          name='confirmEmail'
          value={formData.confirmEmail}
          onChange={handleChange}
        />
      </div>
      <button style={styles.button} onClick={handleSubmit}>
        Change Email
      </button>
    </div>
  );
}

const styles = {
  changeForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundImage: `url(${gameImage})`,
    backgroundSize: "cover",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "white",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default ChangeEmailForm;
