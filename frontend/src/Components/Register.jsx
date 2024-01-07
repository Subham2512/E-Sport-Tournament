import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gameImage from "../Images/gameImage.png";
const Register = () => {
  const navigation = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    dob: new Date(),
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    navigation("/login");
  };

  const validateForm = async () => {
    const { name, username, email, mobile, password } = formData;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mobileRegex = /^\d+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return false;
    }

    if (!mobileRegex.test(mobile)) {
      setError("Mobile number must be numeric");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8 characters long with at least one lowercase letter, one uppercase letter, one digit, and one special character"
      );
      return false;
    }

    setError(""); // Clear any previous errors
    return true;
  };

  const handleSubmit = async () => {
    if (await validateForm()) {
      try {
        // Check if the username exists
        await checkAvailability("username", formData.username);

        // Check if the email exists
        await checkAvailability("email", formData.email);

        // Check if the mobile number exists
        await checkAvailability("mobile", formData.mobile);

        // If all checks pass, submit the registration form
        const response = await axios.post(
          "http://localhost:5000/Register",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        navigation("/login");
        setFormData({
          name: "",
          username: "",
          email: "",
          mobile: "",
          password: "",
          dob: new Date(),
        });
        alert("Registration successful", "You can now log in.");
      } catch (error) {
        // console.error(error);
        if (!error.response.status === 401)
          setError("Registration failed. Please try again.");
      }
    }
  };

  const checkAvailability = async (type, value) => {
    try {
      await axios.post(
        "http://localhost:5000/check-user-exist",
        { type, value },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "json",
        }
      );
    } catch (err) {
      // console.log(type);
      if (type === "username") {
        console.log(type);
        setError("Username exists! Please choose another :)");
      } else if (type === "email") {
        setError("Email already exists!");
      } else if (type === "mobile") {
        setError("Mobile number already exists!");
      } else {
        setError("Registration failed. Please try again.");
      }
      throw err; // Re-throw the error to stop further processing if a check fails
    }
  };
  return (
    <div style={styles.page}>
      <div style={styles.image}></div>
      <div style={styles.container}>
        <h1 style={styles.title}>Register</h1>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder='Name'
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          style={styles.input}
          placeholder='Username'
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <input
          style={styles.input}
          placeholder='Email'
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          style={styles.input}
          placeholder='Mobile Number'
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
        />
        <input
          style={styles.input}
          placeholder='Password'
          type='password'
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {/* <p style={styles.dateText}>Date of Birth</p> */}
        {/* Implement date picker for date of birth */}
        {/* You can use a library or a custom date picker */}
        {/* Display and handle date input based on your requirements */}
        <button style={styles.registerButton} onClick={handleSubmit}>
          Register
        </button>
        <div style={styles.registerContainer}>
          <p style={{ color: "white" }}>Already have an account?</p>
          <button style={styles.button} onClick={handleClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${gameImage})`, // Replace 'your-image-url.jpg' with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Change opacity or color as needed
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: "black",
  },
  date: {
    fontSize: 16,
    textAlign: "center",
    // marginBottom: 10,
    color: "white",
    height: 150,
  },
  dateText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "white",
    // height: 100,
  },
  button: {
    backgroundColor: "brown",
    // padding: 10,
    borderRadius: 5,
    // alignItems: "center",
    // marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  loginText: {
    textAlign: "center",
    marginTop: 10,
    color: "blue",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  registerButton: {
    width: "auto",
    backgroundColor: "brown",
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 5, // Adjust the border radius as needed
    // alignItems: "center",
    // justifyContent: "center",
    // marginLeft: "35%",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
};

export default Register;
