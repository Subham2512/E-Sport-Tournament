import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Card(props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  const isLoggedIn = useSelector((state) => state.login);
  const userId = useSelector((state) => state.userId);
  const [isRegistered, setRegistered] = useState(false);
  const [message, setMessage] = useState("Are you sure want to proceed!");
  const [contestStatus, setContestStatus] = useState("live");
  const timerTimestamp = Date.parse(props.timerExpiresAt);
  const [remainingTime, setRemainingTime] = useState(
    timerTimestamp - new Date()
  );
  const openPopup = () => {
    // console.log(contestStatus);
    if (!isLoggedIn) {
      navigation("login");
      // Handle navigation to login screen
      return null;
    } else if (contestStatus === "expired") {
      navigation("expiredContest", { contestId: props.id });
    } else {
      if (props.registeredPlayers && props.registeredPlayers.includes(userId)) {
        setMessage("You have been registered for this contest!");
      } else {
        setMessage("Are you sure want to proceed!");
      }
      // console.log(userId);
      setIsOpen(true);
    }
    // console.log("hi");
  };

  useEffect(() => {
    const timerInterval = setInterval(async () => {
      const timeDiff = timerTimestamp - new Date();
      if (timeDiff <= 0) {
        clearInterval(timerInterval);
        setContestStatus("expired");
        await axios.post(
          "http://localhost:5000/contest-expired",
          { contestId: props.id },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        setRemainingTime(timeDiff);
      }
    }, 1000); // Update every second

    return () => {
      clearInterval(timerInterval);
    };
  }, [props]);

  const formatTime = (milliseconds) => {
    // Ensure that the input is a non-negative number
    if (typeof milliseconds !== "number" || milliseconds < 0) {
      return "00:00:00";
    }
    // console.log(milliseconds);
    // Calculate hours, minutes, and seconds from milliseconds
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Add leading zeros to ensure two-digit format
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    // Create the formatted time string (HH:MM:SS)
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const closePopup = () => {
    setIsOpen(false);
    setRegistered(false);
    // setMessage("");
  };

  const handleSubmit = async () => {
    if (props.spotLeft > 0) {
      try {
        const res = await axios.post(
          "http://localhost:5000/get-user-profile",
          { userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.status === 200) {
          const err = new Error(res.error);
          throw err;
        }
        try {
          const res_update_balance = await axios.post(
            "http://localhost:5000/update-balance",
            { userId: userId, amount: props.price },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!res_update_balance.status === 200) {
            const err = new Error(res_update_balance.error);
            throw err;
          }
          const data = {
            to: res.data.user.email,
            subject: "Your E-Sport-Champ Erangle Room Credential",
            text: `RoomID: ${props.roomID}, Pass: ${props.roomPass}`,
          };
          try {
            console.log(data);
            const res_send_email = await axios.post(
              "http://localhost:5000/send-email",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!res_send_email.status === 200) {
              const err = new Error(res_send_email.error);
              throw err;
            }
            try {
              const res_contest = await axios.post(
                "http://localhost:5000/Contest",
                { id: props.id, userId: userId },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (!res_contest.status === 200) {
                const err = new Error(res_contest.error);
                throw err;
              }
            } catch (err) {
              if (err.response.status === 401) {
                setMessage("Error registering");
                return;
              }
            }
            // console.log("mail sent");
          } catch (err) {
            if (err.response.status === 500) {
              setMessage("Mail not sent!");
              return;
            }
          }
          // console.log("balance updated");
        } catch (err) {
          if (err.response.status === 401) {
            setMessage("Insufficient Fund!");
            return;
          }
        }
      } catch (err) {
        if (err.response.status === 401) {
          setMessage("User not found!");
          return;
        }
      }

      setRegistered(true);
      setMessage("You have been registered!");
      const updatedSpotLeft = props.spotLeft - 1; // Decrement the spotLeft by 1
      props.setSpotLeft(props.id, updatedSpotLeft);
    }
  };

  return (
    <div className='cardContainer' style={styles.cardContainer}>
      <div className='card' onClick={openPopup} style={styles.card}>
        <p className='cardTime' style={styles.cardTime}>
          {formatTime(remainingTime)}
        </p>
        <div className='cardContent' style={styles.cardContent}>
          <h2 className='cardTitle' style={styles.cardTitle}>
            {props.name}
          </h2>
          <img
            src='http://picsum.photos/500/50'
            alt='Random'
            className='cardImage'
            style={styles.cardImage}
          />
          <p className='cardText' style={styles.cardText}>
            Entry Fee: ₹{props.price}
          </p>
          <p className='cardText' style={styles.cardText}>
            Spots Left: {props.spotLeft}
          </p>
        </div>
      </div>
      {/* Your modal content */}
      {isOpen && (
        <div className='modal'>
          <div style={styles.popup}>
            <p style={styles.popupText}>{message}</p>
            <div style={styles.popupButtons}>
              {isRegistered ? (
                <div>
                  <p style={styles.popupSuccessText}>
                    Your room credentials will be emailed to you. Thank you!
                  </p>
                  <button onClick={closePopup}>Ok</button>
                </div>
              ) : (
                <div>
                  {message === "Are you sure want to proceed!" && (
                    <button onClick={handleSubmit}>Confirm</button>
                  )}
                  <button onClick={closePopup}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    // width: "100%", // Full width of the container
    // maxWidth: 400, // Set maximum width for responsiveness
    // margin: "0 auto", // Center-align horizontally
    // padding: 10,
    // justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: "brown",
    // borderRadius: 8,
    // elevation: 4,
    // marginBottom: 10,
    // boxSizing: "border-box", // Include padding in the width and height
    // height: 120, // Adjust the height of the card
    // display: "flex",
    // flexDirection: "row", // Ensure content stays in a row
    // flexWrap: "wrap", // Allow content to wrap within the container
  },
  cardContent: {
    flexBasis: "100%", // Ensure content spans full width
    display: "flex",
    flexDirection: "column", // Layout in a column
    alignItems: "center", // Center items horizontally
    textAlign: "center", // Center text
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 5,
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: "50%", // Circular shape
    margin: 5,
  },
  cardText: {
    margin: 5,
    fontSize: 12,
    color: "white",
  },
  cardTime: {
    fontSize: 12,
    color: "#777",
    alignSelf: "flex-end", // Align time to the right
  },
  // Other
  popup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  popupSuccessText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "green",
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
};

export default Card;
