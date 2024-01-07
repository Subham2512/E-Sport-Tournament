import React, { useState, useEffect } from "react";
import axios from "axios";
// import { userId } from "../state/actions/index";
import { useNavigate } from "react-router";
import useRazorpay from "react-razorpay";
import gameImage from "../Images/gameImage.png";
import { useSelector } from "react-redux";

function Wallet() {
  const [Razorpay] = useRazorpay();
  const [balance, setBalance] = useState(0);
  const userId = useSelector((state) => state.userId);
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    userId: "", // You need to set the userId here
  });

  useEffect(() => {
    const getBalance = async () => {
      try {
        // Fetch balance logic using axios goes here
        // Example (replace with your actual API endpoint and logic)
        console.log(userId);
        const res = await axios.post(
          "http://localhost:5000/get-balance",
          { userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBalance(res.data.balance);
      } catch (error) {
        console.error(error);
      }
    };

    getBalance();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addMoney = async () => {
    try {
      // Add money logic using axios goes here

      // Example (replace with your actual API endpoint and logic)
      const res = await axios.post(
        "http://localhost:5000/add-money",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      const options = {
        key: "rzp_test_s2VG2G2HwcOQd6", // Enter the Key ID generated from the Dashboard
        amount: formData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: async function (response) {
          await axios.post(
            "http://localhost:5000/verify-payment",
            {
              data: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();

      // // Initialize and open Razorpay payment
      // RazorpayCheckout.open(options)
      //   .then((data) => {
      //     // handle success
      //     alert(`Success: ${data.razorpay_payment_id}`);
      //   })
      //   .catch((error) => {
      //     // handle failure
      //     alert(`Error: ${error.code} | ${error.description}`);
      //   });
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdraw = async () => {
    if (balance > 10) {
      try {
        await axios.post(
          "http://localhost:5000/withdraw-money",
          {
            userId: userId,
            amount: formData.amount,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      setError("Minimum balance must be 10 to withdraw");
    }
  };

  const handleTransaction = () => {
    // Navigate to transaction history page
    // Use React Navigation or other navigation library
    navigation("/transactions");
  };

  return (
    <div style={styles.container}>
      <h1>Your Wallet</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.inputContainer}>
        <label style={styles.inputLabel}>Balance:</label>
        <input
          style={styles.input}
          type='number'
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />
      </div>
      <p style={styles.balance}>Total Balance: ₹{balance}</p>
      <div style={styles.buttons}>
        <button style={styles.registerButton} onClick={addMoney}>
          Add Balance
        </button>
        <button style={styles.registerButton} onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
      <button style={styles.registerButton} onClick={handleTransaction}>
        Transactions
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontFamily: "Arial, sans-serif",
    width: "100vw", // Cover entire viewport width
    height: "100vh", // Cover entire viewport height
    // backgroundColor: "black", // Optionally, set a background color
    backgroundImage: `url(${gameImage})`,
    color: "white",
  },
  h1: {
    fontSize: 24,
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabel: {
    marginRight: 10,
  },
  input: {
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  balance: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttons: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  registerButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "purple",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  registerButtonHover: {
    backgroundColor: "#6a1b9a",
  },
};

export default Wallet;
