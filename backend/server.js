import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config()
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000
// import userRoutes from './userRoutes.js'
import router from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoutes.js"
import cors from 'cors'
import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";

// import fileUpload from "express-fileupload";
// import morgan from "morgan";

// const conn= mongoose.connect("mongodb+srv://shenoyanjana96:moments@moments.o0rfqoi.mongodb.net/moments")
connectDB()
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.SOCKETF,
    }
})
app.set('io', io)
app.use(cors())

// Your socket.io configuration and event handling can go here
io.on("connection", (socket) => {
    console.log("connected to socket.io")
    let userInfo;

    socket.on("setup", async (user) => {
        console.log("User set up:", user);
        userInfo = { ...user, online: true } // Include online status
        socket.join(userInfo.id)
        console.log(userInfo.id)
        socket.emit("connected")
        // Emit online status to all clients
        // socket.emit("userStatus", { userId: userInfo.id, online: true, lastSeen: new Date()  });
        io.to(user.id).emit("userStatus", { userId: user.id, online: true, lastSeen: new Date() });
    })

    // Joining a chat by taking chat room id from frontend
    socket.on("join chat", (room) => {
        socket.join(room)
        console.log("User joined Room: " + room)
    })

    

    // socket.on("new Message", async (newMessageReceived) => {
       
    //     let chat = newMessageReceived.chat;

    //     if (!chat.users) return console.log("chat.users not defined");

    //     // Iterate through users in the chat
    //     for (const user of chat.users) {
    //         if (user._id == newMessageReceived.sender._id) continue;

    //         // Check if the user is online (connected to the socket)
    //         const isUserOnline = io.sockets.adapter.rooms.has(user._id);

    //         // If the user is not online, emit real-time message and store notification
    //         if (!isUserOnline) {
    //             console.log("not online");
    //             socket.in(user._id).emit("message received", newMessageReceived);

    //             // Store notification in the database
    //             await storeNotification(user._id, newMessageReceived);
    //         } else {
    //             // The user is online, only emit real-time message
    //             socket.in(user._id).emit("message received", newMessageReceived);
    //         }
    //     }
    // });
   
    socket.on("join notification", (userid) => {
        socket.join(userid)
        console.log("User joined notification: " + userid)
    })

    // socket.on("count notification", (userInfo) => {
      
    //     socket.join(userInfo)
    //     console.log("User joined count: " + userInfo)
    // })

    socket.off("setup", () => {
        console.log("User Disconnected");
        if (userInfo) {
            socket.leave(userInfo.id);
            io.emit('userStatus', { userId: userInfo.id, online: false, lastSeen: new Date() });
            userInfo = null;  // Reset userInfo on disconnection
        }
    })

    socket.on("disconnect", async () => {
        console.log("User disconnected");
        if (userInfo) {
            await User.updateOne({ _id: userInfo.id }, { online: false, lastSeen: new Date() });
            io.to(userInfo.id).emit('userStatus', { userId: userInfo.id, online: false, lastSeen: new Date() });
            socket.leave(userInfo.id);
            userInfo = null;  // Reset userInfo on disconnection
        }
    });
})



// app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use('/api/users', router)
app.use('/api/admin', adminRoute)

app.get('/', (req, res) =>
    res.send('server is ready')
)

app.use(notFound)
app.use(errorHandler)

const server = httpServer.listen(port, () => console.log(`server is running in ${port}`))





