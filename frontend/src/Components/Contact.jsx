import React, { useState } from "react";
import gameImage from "../Images/gameImage.png";
const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Perform submission logic here
    // You can use the 'name', 'email', and 'message' states to send data to your backend
  };

  return (
    <div style={styles.contactUsContainer}>
      <h2 style={styles.heading}>Contact Us</h2>
      <p style={styles.whiteText}>
        We'd love to hear from you! Reach out to us using the form below.
      </p>

      <div style={styles.contactForm}>
        <div style={styles.formGroup}>
          <label htmlFor='name' style={styles.whiteText}>
            Name:
          </label>
          <input
            style={styles.input}
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Your Name'
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor='email' style={styles.whiteText}>
            Email:
          </label>
          <input
            style={styles.input}
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your Email'
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor='message' style={styles.whiteText}>
            Message:
          </label>
          <textarea
            style={styles.textArea}
            id='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Your Message'
            rows={4}
          />
        </div>
        <button style={styles.button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

const styles = {
  contactUsContainer: {
    padding: 20,
    // backgroundColor: "black",
    backgroundImage: `url(${gameImage})`,
    height: "100vh",
    color: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  contactForm: {
    marginTop: 10,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    border: "1px solid #ccc",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: "white",
    width: "100%",
    boxSizing: "border-box",
  },
  textArea: {
    border: "1px solid #ccc",
    padding: 10,
    borderRadius: 5,
    height: 100,
    width: "100%",
    resize: "vertical",
  },
  whiteText: {
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

export default ContactUs;
