import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "esportchamp7@gmail.com",
    pass: "aurmibvqjwsscvmy",
  },
});

router.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: "esportchamp7@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

export default router;
