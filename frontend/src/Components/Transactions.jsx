import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import gameImage from "../Images/gameImage.png";

function TransactionCard({ txnAmount, txnStatus, txnId }) {
  return (
    <div style={styles.card}>
      <p>{txnAmount}</p>
      <p>{txnStatus}</p>
      <p>{txnId}</p>
    </div>
  );
}

const Transactions = () => {
  const username = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/get-transactions",
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTransactions(res.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.title}>Transaction History</h2>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.txnId}
          txnAmount={transaction.txnAmount}
          txnStatus={transaction.txnStatus}
          txnId={transaction.txnId}
        />
      ))}
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundImage: `url(${gameImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  card: {
    padding: "10px",
    margin: "10px",
    backgroundColor: "brown",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
    color: "white",
  },
};

export default Transactions;
