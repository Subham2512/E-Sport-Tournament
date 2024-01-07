import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { bindActionCreators } from "redux";
import { loginState } from "../state/actions/index";
// import axios from "axios";

function Header() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const login = useSelector((state) => state.login);

  const handleSubmit = async () => {
    try {
      // await axios.post("http://localhost:5000/logout", {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   Credentials: "include",
      // });
      // logout using redux
      dispatch(loginState(false));
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <button onClick={() => navigation("/")} style={styles.navItem}>
          {/* Use appropriate web icons */}
          <span>Home</span>
        </button>

        <button onClick={() => navigation("/about")} style={styles.navItem}>
          {/* Use appropriate web icons */}
          <span>About</span>
        </button>

        <button onClick={() => navigation("/contact")} style={styles.navItem}>
          {/* Use appropriate web icons */}
          <span>Contact</span>
        </button>

        <button onClick={() => navigation("/wallet")} style={styles.navItem}>
          {/* Use appropriate web icons */}
          <span>Wallet</span>
        </button>

        {login && (
          <button onClick={() => navigation("/profile")} style={styles.navItem}>
            {/* Use appropriate web icons */}
            <span>Profile</span>
          </button>
        )}

        {login && (
          <button onClick={handleSubmit} style={styles.navItem}>
            {/* Use appropriate web icons */}
            <span>Logout</span>
          </button>
        )}

        {!login && (
          <button
            onClick={() => navigation("/register")}
            style={styles.navItem}>
            {/* Use appropriate web icons */}
            <span>Login/Register</span>
          </button>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "black",
    padding: "10px 0",
  },
  nav: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0 20px",
  },
  navItem: {
    padding: "0 10px",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "grey",
  },
};

export default Header;
