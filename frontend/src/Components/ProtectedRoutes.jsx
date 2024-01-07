import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useHistory from React Router

const ProtectedRoutes = (props) => {
  const navigation = useNavigate(); // Get the history object from React Router
  const { Component } = props;
  const isLoggedIn = useSelector((state) => state.login);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation("/login"); // Use the history object to navigate
    }
  }, [isLoggedIn, navigation]); // Make sure to include dependencies in the useEffect's dependency array

  return <Component />;
};

export default ProtectedRoutes;
