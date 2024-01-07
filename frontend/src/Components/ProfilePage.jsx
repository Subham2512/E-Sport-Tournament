import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gameImage from "../Images/gameImage.png";

const ProfilePage = () => {
  const userId = useSelector((state) => state.userId);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigate(); // Get navigation object

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/get-user-profile",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.status === 200) {
        const err = new Error(response.error);
        throw err;
      }
      console.log(response.data.user);
      setUser(response.data.user);
      // console.log()
      // if (typeof user.image.uri === String) {
      // }
      // console.log(user);
    } catch (err) {
      navigation("login"); // Use the navigation object to navigate
    }
  };

  useEffect(() => {
    fetchUser();
  }, [selectedImage]);

  const handleUpload = async () => {
    if (selectedImage) {
      const fileName = selectedImage.uri.split("/").pop();
      const fileType = fileName.split(".").pop();

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("image", {
        uri: selectedImage.uri,
        name: fileName,
        type: fileType,
      });

      try {
        await axios.post("http://localhost:5000/update-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Update the user image URI immediately after successful upload
        setUser((prevUser) => ({
          ...prevUser,
          image: { uri: selectedImage.uri },
        }));

        setSelectedImage(null);
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });
    // if (!result.canceled) {
    //   setSelectedImage(result.assets[0]);
    // }
  };

  const handlePasswordChange = () => {
    // Implement password change logic here
    navigation("changePassword"); // Use the navigation object to navigate
  };

  const handleEmailChange = () => {
    // Implement email change logic here
    navigation("changeEmail"); // Use the navigation object to navigate
  };

  return (
    <div className='profileContainer' style={styles.profileContainer}>
      <h1 style={styles.heading}>Profile</h1>
      {user && (
        <div>
          <div style={styles.profileDetails}>
            <img
              style={styles.profileImage}
              src={`data:image/jpg;base64,${user.image.uri}`}
              alt='Profile'
            />
            <div style={styles.imageButtonsContainer}>
              <button style={styles.button} onClick={pickImage}>
                Change Profile Pic
              </button>
              {selectedImage && (
                <img
                  src={selectedImage.uri}
                  style={styles.selectedProfileImage}
                  alt='Selected Profile'
                />
              )}
              <button style={styles.button} onClick={handleUpload}>
                Upload
              </button>
            </div>
            <p style={styles.profileText}>
              <span style={styles.boldText}>Username:</span> {user.username}
            </p>
            <p style={styles.profileText}>
              <span style={styles.boldText}>Email:</span> {user.email}
            </p>
            <p style={styles.profileText}>
              <span style={styles.boldText}>Date of Birth:</span>{" "}
              {new Date(user.dob).toLocaleDateString("en-US")}
            </p>
            <p style={styles.profileText}>
              <span style={styles.boldText}>Name:</span> {user.name}
            </p>
          </div>
          <div style={styles.actionButtonContainer}>
            <button onClick={handlePasswordChange} style={styles.button}>
              Change Password
            </button>
            <button onClick={handleEmailChange} style={styles.button}>
              Change Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundImage: `url(${gameImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "brown",
    color: "white",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent white background
    padding: "20px",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "600px",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "white",
  },
  profileDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    color: "white",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  profileText: {
    marginBottom: "10px",
    color: "white", // Adjust color as needed
  },
  selectedProfileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  profileButton: {
    marginBottom: "10px",
    padding: "8px 16px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  actionButtonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
};
// Add CSS styling similar to React Native styles

export default ProfilePage;
