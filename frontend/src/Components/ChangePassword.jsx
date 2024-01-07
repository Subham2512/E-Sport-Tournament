import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gameImage from "../Images/gameImage.png";

function ChangePasswordForm() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    if (!(formData.newPassword === formData.confirmPassword)) {
      setError("New Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/update-password",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          username: username,
        });
        setError("");
        setMessage("Your Password was successfully changed!");
      } else {
        const err = new Error(res.error);
        throw err;
      }
    } catch (error) {
      setError("Error changing password");
      console.log(error);
    }
  };

  return (
    <div style={styles.changeForm}>
      <h2 style={styles.heading}>Change Password</h2>
      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.message}>{message}</p>}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type='password'
          placeholder='Current Password'
          name='currentPassword'
          value={formData.currentPassword}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type='password'
          placeholder='New Password'
          name='newPassword'
          value={formData.newPassword}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type='password'
          placeholder='Confirm New Password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button style={styles.button} onClick={handleSubmit}>
        Change Password
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
    padding: 20,
    fontFamily: "Arial, sans-serif",
    backgroundImage: `url(${gameImage})`,
    backgroundSize: "cover",
    minHeight: "100vh",
    boxSizing: "border-box",
    color: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  message: {
    color: "green",
    marginBottom: 10,
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
    backgroundColor: "transparent",
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

export default ChangePasswordForm;
