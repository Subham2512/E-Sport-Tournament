import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.18.67:5000"; // Replace with your server's URL
const socket = io(SOCKET_URL);

// Export the socket instance so you can use it in your components
export default socket;
