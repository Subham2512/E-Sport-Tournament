import React, { useState, useEffect } from "react";
import gameImage from "../Images/gameImage.png";
import axios from "axios";
import Card from "./Card";
import socket from "../Socket";

function Contest() {
  const [cards, setCards] = useState([]);
  const [change, setChange] = useState("");
  const [contestChoosen, setContestChoosen] = useState("live");
  const GetCard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ContestData", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setChange("");
  };

  useEffect(() => {
    GetCard(); // Call GetCard when the component mounts
  }, [change]);

  const updateSpotLeft = (cardId, newSpotLeft) => {
    // Find the card by ID and update its spotLeft value in the cards state
    // console.log("contest", newSpotLeft);
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, spotLeft: newSpotLeft } : card
      )
    );
    setChange("changed");
  };

  const updateContestStatus = (cardId, contestStatus) => {
    // Find the card by ID and update its spotLeft value in the cards state
    // console.log("contest", newSpotLeft);
    PastContest();
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, contestStatus: contestStatus } : card
      )
    );
  };

  useEffect(() => {
    // Listen for a "spotLeftUpdate" event from the server
    socket.on("spotLeftUpdate", ({ cardId, newSpotLeft }) => {
      updateSpotLeft(cardId, newSpotLeft);
    });

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("contestStatus");
    };
  }, []);

  useEffect(() => {
    // Listen for a "spotLeftUpdate" event from the server
    socket.on("contestStatus", ({ cardId, contestStatus }) => {
      updateContestStatus(cardId, contestStatus);
    });

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("contestStatus");
    };
  }, []);

  const LiveContest = () => {
    setContestChoosen("live");
  };

  const PastContest = () => {
    setContestChoosen("expired");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contestContainer}>
        <div style={styles.container}>
          <button style={styles.button} onClick={LiveContest}>
            Live Contest
          </button>
          <button style={styles.button} onClick={PastContest}>
            Past Contest
          </button>
        </div>
        {cards.map(
          (cardInfo) =>
            cardInfo.contestStatus === contestChoosen && (
              <Card
                key={cardInfo._id}
                id={cardInfo._id}
                name={cardInfo.name}
                price={cardInfo.price}
                spotLeft={cardInfo.spotleft} // Pass spotLeft as a prop
                roomID={cardInfo.roomID}
                roomPass={cardInfo.roomPass}
                setSpotLeft={updateSpotLeft} // Pass the updateSpotLeft function
                timerExpiresAt={cardInfo.timerExpiresAt}
                contestStatus={cardInfo.contestStatus}
                registeredPlayers={cardInfo.userJoined}
              />
            )
        )}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundImage: `url(${gameImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh", // Set minimum height to cover the entire viewport
  },
  contestContainer: {
    padding: 20,
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px 16px",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "purple",
    padding: "10px 20px",
    borderRadius: 5,
    color: "white",
    cursor: "pointer",
  },
};

export default Contest;
