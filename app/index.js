const dotenv = require("dotenv");
const connectDB = require("./shared/config/database");
const app = require("./app"); // Import the Express app


dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5001;


// Connect to MongoDB
connectDB();

// Start Server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
//add socket io
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let socketsConnected = new Set()

io.on("connection", onConnected)

function onConnected(socket) {
    console.log("🟢 Client connected:", socket.id)

    socketsConnected.add(socket.id)

    io.emit('clients-total' , socketsConnected.size)

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id)
        socketsConnected.delete(socket.id)
        io.emit('clients-total' , socketsConnected.size)
    })

    socket.on('message', (data) => {
        console.log(data)
       socket.broadcast.emit('chat-message',data)
    })
}
   