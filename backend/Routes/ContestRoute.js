import express from "express";
import Contest from "../models/Contest.js";
import { io } from "../app.js";

const router = express.Router();

router.post("/CreateContest", async (req, res) => {
  const { name, price, spotleft, roomID, roomPass } = req.body;
  const newContest = new Contest({ name, price, spotleft, roomID, roomPass });

  // Save the user to the database
  await newContest.save();
});

router.get("/ContestData", async (req, res) => {
  try {
    const contests = await Contest.find({});
    // console.log('Fetched contests:', contests);
    res.json(contests);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
});
router.post("/contest-expired", async (req, res) => {
  Contest.findOneAndUpdate(
    { _id: req.body.id },
    { $inc: { contestStatus: "expired" } }
  )
    .then((result) => {
      console.log("Update result:", result);
      // Emit a Socket.io event to notify clients of the spotLeft update
      io.emit("contestStatus", {
        cardId: req.body.id,
        contestStatus: "expired",
      });

      return res.status(200).send("contest status updated");
    })
    .catch((error) => {
      return res.status(401).send("contest status update caused an error");
    });
});

router.post("/Contest", (req, res) => {
  Contest.findOneAndUpdate(
    { _id: req.body.id },
    { $inc: { spotleft: -1 }, $push: { userJoined: req.body.userId } }
  )
    .then((result) => {
      console.log("Update result:", result);

      // Emit a Socket.io event to notify clients of the spotLeft update
      io.emit("spotLeftUpdate", {
        cardId: req.body.id,
        newSpotLeft: result.spotleft,
      });

      return res.status(200).send("spotLeft updated successfully");
    })
    .catch((error) => {
      return res.status(401).send("spotLeft not updated");
    });
});

export default router;
