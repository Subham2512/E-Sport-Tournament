import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Passport from "passport";
import routes from "./Routes/Index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Passport.initialize());

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend domain
    methods: ["GET", "POST"], // Specify the allowed HTTP methods
    // allowedHeaders: ['my-custom-header'], // Specify any custom headers you want to allow
    credentials: true, // Enable credentials (if your frontend sends cookies, etc.)
  },
});

io.on("connection", (socket) => {
  // ...
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const URL =
  "mongodb+srv://dixitsubham12:nrHAHfB7SBuKMjDh@cluster0.d8owmjo.mongodb.net/E-Sport-Champ?retryWrites=true&w=majority";

mongoose
  .connect(URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/", routes.userRoutes);
app.use("/", routes.emailRoutes);
app.use("/", routes.walletRoutes);
app.use("/", routes.transactionRoutes);
app.use("/", routes.contestRoutes);

server.listen(process.env.PORT || 5000);
