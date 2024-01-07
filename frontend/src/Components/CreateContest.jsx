import React, { useState } from "react";
import axios from "axios";

const CreateContest = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    spotleft: 0,
    roomID: "",
    roomPass: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/CreateContest",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status !== 200) {
        const err = new Error(res.error);
        throw err;
      }
      console.log("contest created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Contest</h2>
      <input
        style={styles.input}
        placeholder='Name'
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        style={styles.input}
        placeholder='Price'
        value={formData.price.toString()}
        onChange={(e) => handleChange("price", parseInt(e.target.value))}
        type='number'
      />
      <input
        style={styles.input}
        placeholder='Spot Left'
        value={formData.spotleft.toString()}
        onChange={(e) => handleChange("spotleft", parseInt(e.target.value))}
        type='number'
      />
      <input
        style={styles.input}
        placeholder='Room ID'
        value={formData.roomID}
        onChange={(e) => handleChange("roomID", e.target.value)}
      />
      <input
        style={styles.input}
        placeholder='Room Password'
        value={formData.roomPass}
        onChange={(e) => handleChange("roomPass", e.target.value)}
      />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: "black",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "white",
  },
};

export default CreateContest;
