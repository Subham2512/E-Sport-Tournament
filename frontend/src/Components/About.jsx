import React from "react";

import gagan from "../Images/dp_gagn.jpg";
import vinay from "../Images/dp_vinay.jpg";
import ayush from "../Images/dp_ayush.jpg";
import gameImage from "../Images/gameImage.png";

const About = () => {
  console.log("hello");
  return (
    <div className='container' style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <div className='teamContainer' style={styles.teamContainer}>
        <div className='teamMember' style={styles.teamMember}>
          <img src={gagan} alt='Gagan' style={styles.dp} />
          <p style={styles.memberName}>Subham Dixit</p>
          {/* <p style={styles.memberRole}>Software Engineer</p> */}
        </div>
        <div className='teamMember' style={styles.teamMember}>
          <img src={vinay} alt='Vinay' style={styles.dp} />
          <p style={styles.memberName}>Ayush Tiwari</p>
          {/* <p style={styles.memberRole}>Software Engineer</p> */}
        </div>
        <div className='teamMember' style={styles.teamMember}>
          <img src={ayush} alt='Ayush' style={styles.dp} />
          <p style={styles.memberName}>Vinay Arjariya</p>
          {/* <p style={styles.memberRole}>Software Engineer</p> */}
        </div>
      </div>
      <p style={styles.description}>
        We are a team of passionate software engineers who are dedicated to
        helping everyone stay connected and compete with their eSport gaming
        skills. Our mission is to provide a platform where gamers can showcase
        their talents and engage in friendly competition.
      </p>
      <p style={styles.description}>
        Whether you're a casual gamer or a competitive player, our platform
        offers a range of features to enhance your gaming experience. Join us
        today and become part of our vibrant gaming community!
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: 16,
    // backgroundColor: "black",
    backgroundImage: `url(${gameImage})`,
    textAlign: "center",
    minHeight: "100vh", // Ensure the container takes at least the full viewport height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  teamContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  teamMember: {
    textAlign: "center",
    color: "white",
    width: "33.33%", // Adjust width to cover one-third of the container
  },
  dp: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    marginBottom: 8,
    margin: "0 auto", // Center align the images horizontally
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "white",
  },
  memberRole: {
    fontSize: 16,
    color: "white",
  },
  description: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 1.6,
    color: "white",
  },
};

export default About;
