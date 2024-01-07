import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { loginState, loggedUser, userId } from "../state/actions/index";
import gameImage from "../Images/gameImage.png";
const Login = () => {
  const dispatch = useDispatch();
  // const { loginState, loggedUser } = bindActionCreators(actions, dispatch);
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // const handleClick = () => {
  //   navigation("register");
  // };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/Login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTimeout(() => {
        dispatch(loggedUser(formData.username));
        dispatch(loginState(true));
        dispatch(userId(res.data.id));
        // Handle navigation to the home screen
        setFormData({
          username: "",
          password: "",
        });
        navigation("/");
      }, 100);
      localStorage.setItem("authToken", res.data.token);
      // const token = await AsyncStorage.getItem("authToken");
      // console.log(token, res);
    } catch (err) {
      if (err.response.status === 401) {
        setError("Invalid username or password");
      }
    }
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.image}></div>
      <div style={styles.container}>
        <h1>Login</h1>
        {error && <p style={styles.errorText}>{error}</p>}
        <input
          style={styles.input}
          type='text'
          placeholder='Username'
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <input
          style={styles.input}
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <button style={styles.loginButton} onClick={handleSubmit}>
          Login
        </button>
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
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the opacity as needed
    color: "white",
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "brown",
    color: "white",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 10,
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
};

export default Login;
