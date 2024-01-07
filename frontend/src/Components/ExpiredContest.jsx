import axios from "axios";
import React, { useEffect, useState } from "react";

const ExpiredContest = ({ match }) => {
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    // Fetch contest data based on contestId
    const fetchContestData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Contest/${match.params.contestId}`
        );
        setContestData(response.data); // Assuming the contest data is received in response.data
      } catch (error) {
        console.error("Error fetching contest data:", error);
      }
    };

    fetchContestData();
  }, [match.params.contestId]);

  if (!contestData) {
    return <p>Loading...</p>;
  }

  // Assuming contestData contains winner, performance, and prize data
  const { winner, performance, prize } = contestData;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Expired Contest Details</h1>
      <div style={styles.table}>
        <div style={styles.row}>
          <span style={styles.header}>Winner:</span>
          <span style={styles.data}>{winner}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.header}>Game Performance:</span>
          <span style={styles.data}>{performance}</span>
        </div>
        <div style={styles.row}>
          <span style={styles.header}>Prize:</span>
          <span style={styles.data}>{prize}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  table: {
    width: "100%",
    border: "1px solid #000",
    borderRadius: 8,
    padding: 8,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #ccc",
  },
  header: {
    fontWeight: "bold",
  },
  data: {},
};

export default ExpiredContest;
